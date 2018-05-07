using ClosedXML.Excel;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProtocolGenerator
{
    public class ITakeEge
    {
        private readonly string destFolderPath;
        private readonly string templateName;
        private readonly CokoContext context;
        private readonly int projectId;

        public ITakeEge(string destFolderPath, string templateName, CokoContext context, int projectId)
        {
            if (string.IsNullOrEmpty(destFolderPath))
            {
                throw new ArgumentException("message", nameof(destFolderPath));
            }

            if (string.IsNullOrEmpty(templateName))
            {
                throw new ArgumentException("message", nameof(templateName));
            }

            this.destFolderPath = destFolderPath;
            this.templateName = templateName;
            this.context = context;
            this.projectId = projectId;
        }

        public void GenerateForAllSchools()
        {
            var results = context.ParticipTests.Where(p => p.ProjectTest.ProjectId == projectId && p.Grade5 != -1)
                .Select(s => new
                {
                    s.Particip.SchoolId,
                    SchoolName = s.Particip.School.Name.Trim(),
                    FIO = s.Particip.Surname + " " + s.Particip.Name + " " + s.Particip.SecondName,
                    Marks = s.QuestionMarks.Select(qm => qm.AwardedMark.ToString()).AsEnumerable().Aggregate((s1, s2) => $"{s1};{s2}"),
                    PrimaryMark = s.QuestionMarks.Select(qm => qm.AwardedMark).Sum(),
                    IsPass = s.QuestionMarks.Select(qm => qm.AwardedMark).Sum() > s.ProjectTest.PassPrimaryMark
                })
                .GroupBy(gb => new { gb.SchoolId, gb.SchoolName });

            foreach (var result in results)
            {
                if (!Directory.Exists($@"{destFolderPath}\{result.Key.SchoolId}"))
                    Directory.CreateDirectory($@"{destFolderPath}\{result.Key.SchoolId}");

                using(var excelTemplate = new XLWorkbook($@"{destFolderPath}\{templateName}"))
                {
                    using(var sheet = excelTemplate.Worksheets.First())
                    {

                    }
                }
            }
        }
    }
}
