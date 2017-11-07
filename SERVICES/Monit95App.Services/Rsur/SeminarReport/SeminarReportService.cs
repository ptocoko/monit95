using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public class SeminarReportService : ISeminarReportService
    {
        #region

        private readonly CokoContext context;

        #endregion

        public SeminarReportService(CokoContext context)
        {
            this.context = context;
        }

        #region Service methods

        // TODO: refactoring
        public IEnumerable<SeminarReportModel> GetSeminarReports(string schoolId)
        {
            return context.RsurReports.Where(p => p.SchoolId == schoolId).ToList().Select(s => new SeminarReportModel
            {
                RsurReportId = s.Id,
                DateText = s.Date.ToString("dd.MM.yyyy"),
                Text = s.Text.Length > 50 ? s.Text.Substring(0, 50) + "..." : s.Text + "...",
                SchoolName = $"{s.SchoolId} - {s.School.Name}"
            }).OrderBy(ob => ob.RsurReportId);
        }

        public IEnumerable<SeminarReportModel> GetSeminarReports(int areaCode)
        {
            return context.RsurReports.Where(p => p.School.AreaCode == areaCode).ToList().Select(s => new SeminarReportModel
            {
                RsurReportId = s.Id,
                DateText = s.Date.ToString("dd.MM.yyyy"),
                Text = s.Text.Length > 50 ? s.Text.Substring(0, 50) + "..." : s.Text + "...",
                SchoolName = $"{s.SchoolId} - {s.School.Name}"
            }).OrderBy(ob => ob.RsurReportId);
        }

        public int SaveFile(Stream fileStream, string fileExtension, int reportId, int index)
        {
            const int repositoryId = 1;
            var repository = context.Repositories.Find(repositoryId);
            string directoryPath = repository.Path;

            if (!Directory.Exists(directoryPath)) Directory.CreateDirectory(directoryPath);

            string fileName = $"{reportId} - {index}{fileExtension}";

            using (var fs = System.IO.File.Create($"{directoryPath}{fileName}"))
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

        #endregion
    }
}
