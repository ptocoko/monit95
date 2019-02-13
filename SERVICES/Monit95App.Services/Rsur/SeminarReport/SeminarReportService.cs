using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Services.File;
using ServiceResult;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using Entities = Monit95App.Domain.Core.Entities;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public class SeminarReportService : ISeminarReportService
    {
        #region Dependencies

        private readonly CokoContext context;
        private readonly IFileService fileService;
        private readonly string seminarReportsFolder = "/file/rsur/seminar-files";

        #endregion

        #region Fields

        private const int seminarReportFileRepositoryId = 5;
        private const int maxFileSize = 15728640; // 15 MB 

        #endregion

        public SeminarReportService(CokoContext context, IFileService fileService)
        {
            this.context = context;
            this.fileService = fileService;
        }

        #region Service methods                  
       
        /// <summary>
        /// Создание отчета
        /// </summary>
        /// <param name="uniqueStreamDictionary"></param>
        /// <param name="schoolId"></param>
        /// <returns></returns>
        /// TODO: refactoring, add specific FileExistException
        public ServiceResult<int> CreateReport(Dictionary<string, UniqueStream> uniqueStreamDictionary, string schoolId)
        {
            var errorResult = new ServiceResult<int>();
            var successResult = new ServiceResult<int>();           

            // create userPermission sequence
            var school = context.Schools.Find(schoolId);
            var areaCode = school.AreaCode;
            IEnumerable<UserPermission> userPermissions = new List<UserPermission>
            {
                new UserPermission
                {
                    UserName = schoolId,
                    Access = Enums.Access.Delete
                },
                new UserPermission
                {
                    UserName = schoolId,
                    Access = Enums.Access.Read
                },
                new UserPermission
                {
                    UserName = areaCode.ToString(),
                    Access = Enums.Access.Read
                }
            };

            int addedProtocolFileId;
            try
            {
                addedProtocolFileId = fileService.Add(
                    seminarReportFileRepositoryId,
                    uniqueStreamDictionary["protocol"].Stream,
                    uniqueStreamDictionary["protocol"].FileName,
                    schoolId,
                    userPermissions,
                    new FileAddingOptions()
                    );
            }
            catch (ArgumentException exception)
            {
                if (exception.Message.Equals("Already exists"))
                    errorResult.AddModelError("protocol", "Такой файл уже зарегестрирован в системе", 409);
                else
                    errorResult.AddModelError("protocol", exception.Message);
                return errorResult;
            }

            // add foto files into repository            
            var addedPhotoFileIds = new List<int>();
            foreach (var key in uniqueStreamDictionary.Keys.Where(k => !k.Equals("protocol")))
            {
                int addedPhotoFileId;
                try
                {
                    addedPhotoFileId = fileService.Add(
                        seminarReportFileRepositoryId,
                        uniqueStreamDictionary[key].Stream,
                        uniqueStreamDictionary[key].FileName,
                        schoolId,
                        userPermissions,
                        new FileAddingOptions()
                        );
                    addedPhotoFileIds.Add(addedPhotoFileId);
                }
                catch (ArgumentException exception)
                {
                    // ISSUE: need to set Conflict HTTP status code if exception called by file existing validate
                    if (exception.Message.Equals("Already exists"))
                        errorResult.AddModelError(key, "Такой файл уже зарегистрирован в системе", 409);
                    else
                        errorResult.AddModelError(key, exception.Message);
                    continue;
                }
                //addedPhotoFileIds.Add(addedPhotoFileId); // ISSUE: FileId adding to list regardless of whether the file is saved or not
            }
            if (addedPhotoFileIds.Count() < 2) // если добавленных фотографий меньше двух, то уходим
            {
                // перед выходом удаляем уже добавленный файл протокола
                fileService.Delete(addedProtocolFileId, schoolId);

                // удалаемя удачно добавленные фотографии
                foreach (var fileId in addedPhotoFileIds.Where(id => id > 0))
                    fileService.Delete(fileId, schoolId);

                // выходим из метода, не создавая записей в БД
                return errorResult;
            }

            // сreate RsurReport object
            var rsurReport = new RsurReport { SchoolId = schoolId };
            // add into RsurReport RsurReportFile object of protocol file
            rsurReport.RsurReportFiles.Add(new RsurReportFile { FileId = addedProtocolFileId, IsProtocol = true });
            // add into RsurReport RsurReportFile object of foto files
            foreach (var photoFileId in addedPhotoFileIds)
                rsurReport.RsurReportFiles.Add(new RsurReportFile { FileId = photoFileId });

            context.RsurReports.Add(rsurReport);
            context.SaveChanges(); // переносим изменения в БД            

            successResult.Result = rsurReport.Id;
            return successResult;
        }

        /// <summary>
        /// Удаление отчета
        /// </summary>
        /// <param name="rsurReportId"></param>
        /// <param name="schoolId"></param>
        /// <returns>Удаляет файл протокола и все фотографии</returns>
        public VoidResult DeleteReport(int rsurReportId, string schoolId)
        {
            var result = new VoidResult();

            var report = context.RsurReports.SingleOrDefault(r => r.Id == rsurReportId && r.SchoolId == schoolId);
            if (report == null)
            {
                result.AddModelError("DeleteReport", $"{nameof(rsurReportId)} '{rsurReportId}' or {nameof(schoolId)} '{schoolId}' is invalid");
                return result;
            }

            var fileIds = report.RsurReportFiles.Select(rf => rf.FileId).ToList(); // get report file ids before delete report

            // Delete RsurReport object from database -> delete corresponding RsurReportFile objects
            context.RsurReports.Remove(report);
            context.SaveChanges();

            // Delete report files
            foreach (var filelId in fileIds)
                fileService.Delete(filelId, schoolId);

            return result;
        }

        /// <summary>
        /// Получить файлы одного отчета
        /// </summary>
        /// <param name="reportId"></param>
        /// <param name="userName"></param>
        /// <returns>(string key, string base64String)</returns>
        /// TODO: refactoring:
        public SeminarReportEditDto GetEditDto(int reportId, string userName)
        {
            var filePermissionForRead = new FilePermission
            {
                UserName = userName,
                PermissionId = 1
            };

            var report = context.RsurReports.Find(reportId);
            if (report == null)
                throw new ArgumentException($"{reportId}: отчета с таким клучом не существует");

            var reportFiles = report.RsurReportFiles.Where(rf => rf.RsurReportId == reportId &&
                                                                 rf.File.FilePermissonList.Any(fp => fp.Equals(filePermissionForRead))).ToList();

            if (!reportFiles.Any()) throw new UnauthorizedAccessException("недостаточно прав для доступа к данному содержимому");

            return new SeminarReportEditDto
            {
                SeminarReportViewDto = GetSeminarInfo(report),
                SeminarFiles = GetSeminarFiles(reportFiles)
            };
            
            //// Procces protocol files
            //var protocolFile = reportFiles.Single(rf => rf.IsProtocol).File;
            //var protocolFileBase64String = GetProtocolBase64String(protocolFile);
            //seminarFiles.Add(new SeminarFile
            //{
            //    Type = protocolFile.Name.Split('.').Last(),
            //    Key = "protocol",
            //    FileSourceString = protocolFileBase64String
            //});
            ////resultDic.Add("protocol", protocolFileBase64String);

            //// Procces foto files
            //var index = 1;
            //foreach (var photoFileId in reportFiles.Where(rf => !rf.IsProtocol).Select(rf => rf.FileId))
            //{
            //    var fotoFileBase64String = fileService.GetFileBase64String(photoFileId);
            //    seminarFiles.Add($"foto{index++}", fotoFileBase64String);
            //}

            //// TODO: this code dublicate
            //var editDto = new SeminarReportEditDto
            //{
            //    SeminarFiles = seminarFiles,
            //    SeminarReportViewDto = new SeminarReportViewDto
            //    {
            //        RsurReportId = reportId,
            //        DateText = report.Date.ToString("dd MMM yyyy, HH:mm", new CultureInfo("ru-RU")),
            //        SchoolName = $"{report.SchoolId} - {report.School.Name}"
            //    }
            //};

            //return editDto;
        }

        
        /// <summary>
        /// Получить список отчетов
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>        
        [SuppressMessage("ReSharper", "SuggestVarOrType_BuiltInTypes")]
        public IEnumerable<SeminarReportViewDto> GetViewDtos(string userName)
        {
            IEnumerable<RsurReport> reportEntities;
            var date2018YearReports = new DateTime(2018, 9, 1);
            var queryToGetReportEntities = context.RsurReports.Where(report => report.Date > date2018YearReports)
                                                              .OrderBy(ob => ob.Date);
            if (userName.Length == 3) // areaCode is three-digit number
            {
                int.TryParse(userName, out int areaCode);
                if (areaCode == 0)
                    throw new ArgumentException(nameof(areaCode));
                reportEntities = queryToGetReportEntities.Where(report => report.School.AreaCode == areaCode).ToList();
            }
            else
                reportEntities = queryToGetReportEntities.Where(report => report.SchoolId == userName).ToList();

            var viewDtos = reportEntities.Select(report => new SeminarReportViewDto
            {
                RsurReportId = report.Id,
                DateText = report.Date.ToString("dd MMM yyyy, HH:mm", new CultureInfo("ru-RU")),
                SchoolName = $"{report.SchoolId} - {report.School.Name}"
            });

            return viewDtos;
        }

        #endregion

        #region Private methods

        private SeminarReportViewDto GetSeminarInfo(RsurReport report)
        {
            return new SeminarReportViewDto
            {
                RsurReportId = report.Id,
                DateText = report.Date.ToString("dd MMM yyyy, HH:mm", new CultureInfo("ru-RU")),
                SchoolName = $"{report.SchoolId} - {report.School.Name}"
            };
        }

        private IList<SeminarFile> GetSeminarFiles(IEnumerable<RsurReportFile> rsurReportFiles)
        {
            var seminarFiles = new List<SeminarFile>();
            int i = 0;
            foreach (var report in rsurReportFiles.OrderByDescending(rf => rf.IsProtocol))
            {
                seminarFiles.Add(new SeminarFile
                {
                    Type = GetSeminarFileType(report.File.Name),
                    Key = report.IsProtocol ? "protocol" : $"image_{i++}",
                    //FileSourceString = GetBase64String(report.File),
                    FileUrl = $"{seminarReportsFolder}/{report.File.RepositoryId}/{report.File.Name}"
                });
            }
            return seminarFiles;
        }

        /// <summary>
        /// Получает содержимое файла-протокола
        /// </summary>        
        /// <param name="fileEntity"></param>
        /// <returns></returns>
        [SuppressMessage("ReSharper", "PossibleNullReferenceException")]
        private string GetBase64String(Entities.File fileEntity)
        {            
            var extension = Path.GetExtension(fileEntity.Name);
            string base64String;
            if (new[] { ".tif", ".tiff" }.Contains(extension))
            {
                base64String = fileService.ConvertTiffToJpegBase64(fileService.GetFileStream(fileEntity.Id));
            }
            else
            {
                base64String = fileService.GetFileBase64String(fileEntity.Id);
            }

            return base64String;
        }

        private string GetSeminarFileType(string seminarFileName)
        {
            var extension = seminarFileName.Split('.').Last();
            var imageExtensions = new string[] { "jpg", "jpeg", "png", };

            if (!String.IsNullOrEmpty(extension))
            {
                if (extension == "pdf") return "pdf";
                else if (extension == "docx") return "docx";
                else return "image";
            }
            else
            {
                throw new ArgumentException($"{seminarFileName}: неверное имя файла или расширение");
            }
        }

        #endregion    
    }

}

//// if file is tiff https://goo.gl/nBkQR5
//if (new string[] { ".tif", ".tiff" }.Contains(extension.ToLower()))
//{
//    destFileName = $"{destFileName}.jpg";
//    using (Image imageFile = Image.FromStream(sourceFileStream))
//    {
//        FrameDimension frameDimensions = new FrameDimension(
//            imageFile.FrameDimensionsList[0]);

//        // Gets the number of pages from the tiff image (if multipage)
//        int frameNum = imageFile.GetFrameCount(frameDimensions);
//        string[] jpegPaths = new string[frameNum];

//        for (int frame = 0; frame < frameNum; frame++)
//        {
//            // Selects one frame at a time and save as jpeg.
//            imageFile.SelectActiveFrame(frameDimensions, frame);
//            using (Bitmap bmp = new Bitmap(imageFile))
//            {
//                jpegPaths[frame] = $@"{REPOSITORIES_FOLDER}\{repositoryId}\{destFileName}";
//                bmp.Save(jpegPaths[frame], ImageFormat.Jpeg);
//            }
//        }
//    }
//}