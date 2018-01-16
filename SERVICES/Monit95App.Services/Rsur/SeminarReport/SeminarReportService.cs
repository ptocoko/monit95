using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using Monit95App.Services.File;
using ServiceResult;
using System;
using System.Globalization;
using System.Security.Authentication;

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
            var errorResult = new ServiceResult<int>();
            var successResult = new ServiceResult<int>();

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
                    userPermissions
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
                        userPermissions
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
        /// TODO: refactoring
        public SeminarReportEditDto GetEditDto(int reportId, string userName)
        {
            var filePermissionForRead = new FilePermission
            {
                UserName = userName,
                PermissionId = 1
            };

            var report = context.RsurReports.Find(reportId);
            if (report == null)
                throw new ArgumentException(nameof(reportId));

            var reportFiles = report.RsurReportFiles.Where(rf => rf.RsurReportId == reportId &&
                                                                 rf.File.FilePermissonList.Any(fp => fp.Equals(filePermissionForRead)));
            if (!reportFiles.Any())
                throw new AuthenticationException($"{nameof(reportId)}: {reportId}, {nameof(userName)}: {userName}");

            var seminarFiles = new Dictionary<string, string>();
            // Procces protocol files
            var protocolFile = reportFiles.Single(rf => rf.IsProtocol);
            var protocolFileBase64String = fileService.GetFileBase64String(protocolFile.FileId, userName);
            seminarFiles.Add("protocol", protocolFileBase64String);

            // Procces foto files
            int index = 1;
            foreach (var reportFile in reportFiles.Where(rf => !rf.IsProtocol))
            {
                var fotoFileBase64String = fileService.GetFileBase64String(reportFile.FileId, userName);
                seminarFiles.Add($"foto{index++}", fotoFileBase64String);
            }

            // TODO: this code dublicate
            var editDto = new SeminarReportEditDto
            {
                SeminarFiles = seminarFiles,
                SeminarReportViewDto = new SeminarReportViewDto
                {
                    RsurReportId = reportId,
                    DateText = report.Date.ToString("dd MMM yyyy, HH:mm:ss", new CultureInfo("ru-RU")),
                    SchoolName = $"{report.SchoolId} - {report.School.Name}"
                }
            };

            return editDto;
        }

        /// <summary>
        /// Получить список отчетов
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>        
        public IEnumerable<SeminarReportViewDto> GetViewDtos(string userName)
        {
            IEnumerable<RsurReport> reportEntities;
            var date2018YearReports = new DateTime(2018, 1, 1);
            var queryToGetReportEntities = context.RsurReports.Where(report => report.Date > date2018YearReports);
            if (userName.Length == 3) // areaCode is three-digit number
            {
                Int32.TryParse(userName, out int areaCode);
                if (areaCode == 0)
                    throw new ArgumentException(nameof(areaCode));
                reportEntities = queryToGetReportEntities.Where(report => report.School.AreaCode == areaCode).ToList();
            }
            else
                reportEntities = queryToGetReportEntities.Where(report => report.SchoolId == userName).ToList();

            var viewDtos = reportEntities.Select(report => new SeminarReportViewDto
            {
                RsurReportId = report.Id,
                DateText = report.Date.ToString("dd MMM yyyy, HH:mm:ss", new CultureInfo("ru-RU")),
                SchoolName = $"{report.SchoolId} - {report.School.Name}"
            });

            return viewDtos;
        }

        #endregion

        #region Private methods



        #endregion
    }
}