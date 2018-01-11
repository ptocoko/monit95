using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Monit95App.Services.File;
using ServiceResult;
using System;
using System.Web;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public class SeminarReportService : ISeminarReportService
    {
        #region Dependencies

        private readonly CokoContext context;
        private readonly IFileService fileService;

        #endregion

        #region Fields

        private const int seminarReportFileRepositoryId = 1;
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
        /// <param name="inputStreamTyple">
        /// (string key, string fileName, Stream)
        /// Словарь должен содержать 1 файл протокола c ключом "protocol" и 2-4 файлов фотографий. Файлы не должны превыщать размер 15 МБ
        /// </param>
        /// <param name="schoolId"></param>
        /// <returns>Id отчета</returns>
        // TODO: refactoring, add specific FileExistException
        public ServiceResult<int> CreateReport(Dictionary<string, UniqueStream> uniqueStreamDictionary, string schoolId)
        {
            var result = new ServiceResult<int>();

            // VALIDATE
            //if (inputStreamDictionary == null)
            //    throw new ArgumentNullException(nameof(inputStreamDictionary));
            //if (inputStreamDictionary.Count < 3 || inputStreamDictionary.Count > 5)
            //    throw new ArgumentOutOfRangeException("Is null, count < 3 or count > 5", nameof(inputStreamDictionary));
            //if (!context.Schools.Any(s => s.Id == schoolId))
            //    throw new ArgumentException(nameof(schoolId));

            // validate resultStreamDictionary content

            //var resultStreamDictionary = inputStreamTyple.Where(kvp => kvp.Value != null && kvp.Value.InputStream.Length <= maxFileSize)
            //                                                  .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
            //if (!resultStreamDictionary.Any(kvp => kvp.Key.Equals("protocol")))
            //{
            //    result.AddModelError("protocol", "Protocol file has not");
            //    return result;
            //}

            // ADD FILES INTO FILE REPOSITORY
            // add protocol file into file repository
            
            int addedProtocolFileId;
            try
            {
                addedProtocolFileId = fileService.Add(seminarReportFileRepositoryId, uniqueStreamDictionary["protocol"].Stream, uniqueStreamDictionary["protocol"].FileName, schoolId);
            }
            catch (ArgumentException exception)
            {
                if (exception.Message.Equals("Already exists"))
                    result.AddModelError("protocol", "Такой файл уже зарегестрирован в системе");
                else
                    result.AddModelError("protocol", exception.Message);
                return result;
            }            

            // add foto files into repository            
            var addedPhotoFileIds = new List<int>();
            foreach (var key in uniqueStreamDictionary.Keys.Where(k => !k.Equals("protocol")))
            {
                int addedPhotoFileId;
                try
                {
                    addedPhotoFileId = fileService.Add(seminarReportFileRepositoryId, uniqueStreamDictionary[key].Stream,
                                                       uniqueStreamDictionary[key].FileName, schoolId);
                }
                catch (ArgumentException exception)
                {
                    if (exception.Message.Equals("Already exists"))
                        result.AddModelError(key, "Такой файл уже зарегистрирован в системе");
                    else
                        result.AddModelError(key, exception.Message);
                    continue;
                }
                addedPhotoFileIds.Add(addedPhotoFileId);                
            }
            
            if (addedPhotoFileIds.Count() < 2) // если добавленных фотографий меньше двух, то уходим
            {
                // перед выходом удаляем уже добавленный файл протокола
                fileService.Delete(addedProtocolFileId, schoolId); 

                // удалаемя удачно добавленные фотографии
                foreach (var fileId in addedPhotoFileIds.Where(i => i > 0))
                    fileService.Delete(fileId, schoolId);                          
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
                                            
            result.Result = rsurReport.Id;
            return result;
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

            // Delete report files
            foreach (var filelId in fileIds)
                fileService.Delete(filelId);
                        
            return result;
        }

        /// <summary>
        /// Получить файлы отчета
        /// </summary>
        /// <param name="reportId"></param>
        /// <param name="filePermission"></param>
        /// <returns></returns>
        // TODO: refactoring
        public Dictionary<string, string> GetReport(int reportId, string userName)
        {
            var filePermissionForRead = new FilePermission
            {
                UserName = userName,
                PermissionId = 1
            };
            var reportFiles = context.RsurReportFiles.Where(rf => rf.RsurReportId == reportId && rf.File.FilePermissonList.Any(fp => fp.Equals(filePermissionForRead)));
            var resultDictionary = new Dictionary<string, string>();

            // Procces foto files
            int index = 1;
            foreach (var reportFile in reportFiles.Where(rf => rf.IsProtocol == false))
            {
                var fotoFileBase64String = fileService.GetFileBase64String(reportFile.FileId, userName);
                resultDictionary.Add($"foto{index++}", fotoFileBase64String);
            }

            var protocolReportFile = reportFiles.Single(x => x.IsProtocol == true);
            var protocolFileBase64String = fileService.GetFileBase64String(protocolReportFile.FileId, userName);
            resultDictionary.Add("protocol", protocolFileBase64String);

            return resultDictionary;
        }

        #endregion
    }
}

//public IEnumerable<SeminarReportModel> GetSeminarReports(string schoolId)
//{
//    return context.RsurReports.Where(p => p.SchoolId == schoolId).OrderByDescending(ob => ob.Date).ToList().Select(s => new SeminarReportModel
//    {
//        RsurReportId = s.Id,
//        DateText = s.Date.ToString("dd.MM.yyyy, HH:mm"),
//        Text = s.Text.Length > 50 ? s.Text.Substring(0, 50) + "..." : s.Text,
//        SchoolName = $"{s.SchoolId} - {s.School.Name}"
//    });
//}

//public IEnumerable<SeminarReportModel> GetSeminarReports(int areaCode)
//{
//    return context.RsurReports.Where(p => p.School.AreaCode == areaCode).OrderByDescending(ob => ob.Date).ToList().Select(s => new SeminarReportModel
//    {
//        RsurReportId = s.Id,
//        DateText = s.Date.ToString("dd.MM.yyyy, HH:mm"),
//        Text = s.Text.Length > 50 ? s.Text.Substring(0, 50) + "..." : s.Text,
//        SchoolName = $"{s.SchoolId} - {s.School.Name}"
//    });
//}

//public int SaveFile(Stream fileStream, string fileExtension, int reportId, int index, string imagesServerFolder)
//{
//    var repository = context.Repositories.Find(seminarReportFileRepositoryId);
//    string directoryPath = repository.Path;

//    if (!Directory.Exists(directoryPath)) Directory.CreateDirectory(directoryPath);

//    string fileName = $"{reportId} - {index}{fileExtension}";

//    using (var fs = System.IO.File.Create($"{directoryPath}{fileName}"))
//    {
//        fileStream.Seek(0, SeekOrigin.Begin);
//        fileStream.CopyTo(fs);
//    }

//    using (var fs = System.IO.File.Create($"{imagesServerFolder}\\{fileName}"))
//    {
//        fileStream.Seek(0, SeekOrigin.Begin);
//        fileStream.CopyTo(fs);
//    }

//    var file = new Domain.Core.Entities.File { Name = fileName, RepositoryId = seminarReportFileRepositoryId };
//    context.Files.Add(file);
//    context.SaveChanges();

//    // CreateRsurReportFilesEntry
//    var entity = new RsurReportFile { RsurReportId = reportId, FileId = file.Id };
//    context.RsurReportFiles.Add(entity);
//    context.SaveChanges();

//    return file.Id;
//}

//public int SaveText(string text, string schoolId)
//{
//    var entity = new RsurReport { Text = text, SchoolId = schoolId, Date = DateTime.Now };
//    context.RsurReports.Add(entity);
//    context.SaveChanges();

//    return entity.Id;
//}

//public SeminarReportModel GetReport(int reportId)
//{
//    var model = context.RsurReports.Find(reportId);

//    return new SeminarReportModel
//    {
//        SchoolName = $"{model.SchoolId} - {model.School.Name}",
//        DateText = model.Date.ToString("dd.MM.yyyy, HH:mm"),
//        Text = model.Text,
//        ImagesUrls = model.RsurReportFiles.Select(s => $"/Images/seminar-photos/{s.File.Name}")
//    };
//}

//public void DeleteReportOldVersion(int reportId, string imagesServerFolder)
//{
//    var directoryPath = context.Repositories.Find(seminarReportFileRepositoryId).Path;
//    var fileNames = context.RsurReportFiles.Where(p => p.RsurReportId == reportId).Select(s => s.File.Name);
//    var fileIds = context.RsurReportFiles.Where(p => p.RsurReportId == reportId).Select(s => s.FileId);

//    foreach (var fileName in fileNames)
//    {
//        System.IO.File.Delete($"{directoryPath}{fileName}");
//        System.IO.File.Delete($"{imagesServerFolder}\\{fileName}");
//    }

//    var reportEntity = context.RsurReports.Find(reportId);
//    var fileEntities = context.Files.Where(p => fileIds.Contains(p.Id));

//    context.RsurReports.Remove(reportEntity);
//    context.Files.RemoveRange(fileEntities);
//    context.SaveChanges();
//}