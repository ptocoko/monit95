using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Validation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Monit95App.Services.File;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public class SeminarReportService : ISeminarReportService
    {
        #region Dependencies

        private readonly CokoContext context;
        private readonly IFileService fileService;

        #endregion

        #region Fields

        private const int repositoryId = 1;
        private const int maxProtocolFileSize = 15728640; // 15 MB 

        #endregion

        public SeminarReportService(CokoContext context, IFileService fileService)
        {
            this.context = context;
            this.fileService = fileService;
        }

        #region Service methods

        // TODO: refactoring
        public IEnumerable<SeminarReportModel> GetSeminarReports(string schoolId)
        {
            return context.RsurReports.Where(p => p.SchoolId == schoolId).OrderByDescending(ob => ob.Date).ToList().Select(s => new SeminarReportModel
            {
                RsurReportId = s.Id,
                DateText = s.Date.ToString("dd.MM.yyyy, HH:mm"),
                Text = s.Text.Length > 50 ? s.Text.Substring(0, 50) + "..." : s.Text,
                SchoolName = $"{s.SchoolId} - {s.School.Name}"
            });
        }

        public IEnumerable<SeminarReportModel> GetSeminarReports(int areaCode)
        {
            return context.RsurReports.Where(p => p.School.AreaCode == areaCode).OrderByDescending(ob => ob.Date).ToList().Select(s => new SeminarReportModel
            {
                RsurReportId = s.Id,
                DateText = s.Date.ToString("dd.MM.yyyy, HH:mm"),
                Text = s.Text.Length > 50 ? s.Text.Substring(0, 50) + "..." : s.Text,
                SchoolName = $"{s.SchoolId} - {s.School.Name}"
            });
        }

        public int SaveFile(Stream fileStream, string fileExtension, int reportId, int index, string imagesServerFolder)
        {
            var repository = context.Repositories.Find(repositoryId);
            string directoryPath = repository.Path;

            if (!Directory.Exists(directoryPath)) Directory.CreateDirectory(directoryPath);

            string fileName = $"{reportId} - {index}{fileExtension}";

            using (var fs = System.IO.File.Create($"{directoryPath}{fileName}"))
            {
                fileStream.Seek(0, SeekOrigin.Begin);
                fileStream.CopyTo(fs);
            }

            using (var fs = System.IO.File.Create($"{imagesServerFolder}\\{fileName}"))
            {
                fileStream.Seek(0, SeekOrigin.Begin);
                fileStream.CopyTo(fs);
            }

            var file = new Domain.Core.Entities.File { Name = fileName, RepositoryId = repositoryId };
            context.Files.Add(file);
            context.SaveChanges();

            // CreateRsurReportFilesEntry
            var entity = new RsurReportFile { RsurReportId = reportId, FileId = file.Id };
            context.RsurReportFiles.Add(entity);
            context.SaveChanges();

            return file.Id;
        }

        public int SaveText(string text, string schoolId)
        {
            var entity = new RsurReport { Text = text, SchoolId = schoolId, Date = DateTime.Now };
            context.RsurReports.Add(entity);
            context.SaveChanges();

            return entity.Id;
        }

        public SeminarReportModel GetReport(int reportId)
        {
            var model = context.RsurReports.Find(reportId);

            return new SeminarReportModel
            {
                SchoolName = $"{model.SchoolId} - {model.School.Name}",
                DateText = model.Date.ToString("dd.MM.yyyy, HH:mm"),
                Text = model.Text,
                ImagesUrls = model.RsurReportFiles.Select(s => $"/Images/seminar-photos/{s.File.Name}")
            };
        }

        public void DeleteReport(int reportId, string imagesServerFolder)
        {
            var directoryPath = context.Repositories.Find(repositoryId).Path;
            var fileNames = context.RsurReportFiles.Where(p => p.RsurReportId == reportId).Select(s => s.File.Name);
            var fileIds = context.RsurReportFiles.Where(p => p.RsurReportId == reportId).Select(s => s.FileId);

            foreach (var fileName in fileNames)
            {
                System.IO.File.Delete($"{directoryPath}{fileName}");
                System.IO.File.Delete($"{imagesServerFolder}\\{fileName}");
            }

            var reportEntity = context.RsurReports.Find(reportId);
            var fileEntities = context.Files.Where(p => fileIds.Contains(p.Id));

            context.RsurReports.Remove(reportEntity);
            context.Files.RemoveRange(fileEntities);
            context.SaveChanges();
        }

        /// <summary>
        /// Создание отчета
        /// </summary>
        /// <remarks>Создание отчета происходит при помощи файла-протокола проведение ШМО</remarks>
        /// <param name="protocolFileStream"></param>
        /// <param name="protocolFileName"></param>
        /// <param name="schoolId">Id школы - он же имя пользователя</param>
        /// <returns>
        /// Возвращает RsurReports.Id для того чтобы дальше уже при добавлении фотографий их можно
        /// было бы регистрировать в RsurReportFiles
        /// </returns>
        /// TODO: Использовать транзакцию
        public ServiceResult<int> CreateReport(Stream protocolFileStream, string protocolFileName, string schoolId)
        {
            var serviceResult = new ServiceResult<int>();

            // Validate protocolFileStream
            if (protocolFileStream == null || protocolFileStream.Length > maxProtocolFileSize)
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(protocolFileStream)} is invalid: null or length > 15 MB" });
                return serviceResult;
            }

            // Validate protocolFileName
            if (string.IsNullOrWhiteSpace(protocolFileName))
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(protocolFileName)} is invalid: null or empty" });
                return serviceResult;
            }

            // Validate schoolId            
            if (!context.Schools.Any(s => s.Id == schoolId))
            {                
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(schoolId)}: '{schoolId}' is invalid" });
                return serviceResult;
            }
            
            // 1) Add protocol file to file repository and get its file id
            var fileServiceResult = fileService.Add(repositoryId, protocolFileStream, protocolFileName, schoolId);

            // Проверяем были ли ошибки при добавления файла протокола
            if (fileServiceResult.Errors.Any())
            {
                foreach (var error in fileServiceResult.Errors)
                    serviceResult.Errors.Add(error);
                
                return serviceResult;
            }

            var protocolFileId = fileServiceResult.Result;

            // 2) Create RsurReport object in database
            var rsurReport = new RsurReport
            {
                SchoolId = schoolId
            };
            context.RsurReports.Add(rsurReport);
            context.SaveChanges();

            // 3) Create RsurReportFile in database
            context.RsurReportFiles.Add(new RsurReportFile
            {
                RsurReportId = rsurReport.Id,
                FileId = protocolFileId,
                IsProtocol = true
            });
            context.SaveChanges();

            serviceResult.Result = rsurReport.Id;
            return serviceResult;
        }

        #endregion
    }
}
