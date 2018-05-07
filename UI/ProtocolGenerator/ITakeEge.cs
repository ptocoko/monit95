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
                    s.Particip.Surname,
                    s.Particip.Name,
                    s.Particip.SecondName,
                    TestName = s.ProjectTest.Test.Name,
                    Marks = s.QuestionMarks.Select(qm => qm.AwardedMark.ToString()).AsEnumerable().Aggregate((s1, s2) => $"{s1};{s2}"),
                    PrimaryMark = s.QuestionMarks.Select(qm => qm.AwardedMark).Sum(),
                    IsPass = s.QuestionMarks.Select(qm => qm.AwardedMark).Sum() > s.ProjectTest.PassPrimaryMark
                })
                .GroupBy(gb => new { gb.SchoolId, gb.SchoolName });

            foreach (var schoolResult in results)
            {
                if (!Directory.Exists($@"{destFolderPath}\{schoolResult.Key.SchoolId}"))
                    Directory.CreateDirectory($@"{destFolderPath}\{schoolResult.Key.SchoolId}");

                using(var excelTemplate = new XLWorkbook($@"{destFolderPath}\{templateName}"))
                {

                    using(var sheet = excelTemplate.Worksheets.First())
                    {
                        sheet.Cell(2, 1).Value = $"{schoolResult.Key.SchoolName}";
                        int i = 0;
                        foreach(var result in schoolResult)
                        {
                            sheet.Cell(i + 3, 2).Value = result.Surname;
                            sheet.Cell(i + 3, 3).Value = result.Name;
                            sheet.Cell(i + 3, 4).Value = result.SecondName;
                            sheet.Cell(i + 3, 5).Value = result.TestName;
                            sheet.Cell(i + 3, 6).Value = result.Marks;
                            sheet.Cell(i + 3, 7).Value = result.PrimaryMark;
                            sheet.Cell(i + 3, 8).Value = result.IsPass ? "зачет" : "незачет";
                        }
                    }

                    excelTemplate.SaveAs($@"{destFolderPath}\{schoolResult.Key.SchoolId}\{schoolResult.Key.SchoolId}_201701.xlsx");
                }
            }
        }
    }
}
