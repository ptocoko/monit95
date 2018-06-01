using ClosedXML.Excel;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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

        public IQueryable<ParticipTest> GetCorrectParticipTestsQuery() => context.ParticipTests.AsNoTracking().Where(p => p.ProjectTest.ProjectId == projectId);// && p.Grade5 != -1);

        public void SolveAndSaveGrade5AndPrimaryMark()
        {
            var participTests = GetCorrectParticipTestsQuery().Include(inc => inc.QuestionMarks).Include(inc => inc.ProjectTest);

            foreach (var participTest in participTests)
            {
                participTest.PrimaryMark = participTest.QuestionMarks.Select(s => s.AwardedMark).Sum();
                participTest.Grade5 = (int?)participTest.PrimaryMark >= participTest.ProjectTest.PassPrimaryMark ? 5 : 2;
            }

            context.SaveChanges();
        }

        public void GenerateForAllSchools()
        {
            var participTests = GetCorrectParticipTestsQuery();

            GenerateReports(participTests);
        }

        public void GenerateReportsForSchools(string[] schoolIds)
        {
            var participTests = GetCorrectParticipTestsQuery().Where(p => schoolIds.Contains(p.Particip.SchoolId));

            GenerateReports(participTests);
        }

        private void GenerateReports(IQueryable<ParticipTest> participTests)
        {
            var groupedTestResults = participTests
                //.OrderBy(ob => ob.Particip.SchoolId).ThenBy(ob => ob.Particip.Surname).ThenBy(tb => tb.Particip.Name).ThenBy(tb => tb.ProjectTest.Test.NumberCode)
                .Select(MapToReportModel)
                .OrderBy(ob => ob.Surname).ThenBy(tb => tb.Name).ThenBy(tb => tb.NumberCode)
                .GroupBy(gb => new { gb.SchoolId, gb.SchoolName, gb.AreaName });

            string reportFolder = $@"{destFolderPath}\результаты худших школ\я сдам огэ";

            foreach (var schoolResult in groupedTestResults)
            {
                //if (!Directory.Exists($@"{destFolderPath}\{schoolResult.Key.SchoolId}"))
                //    Directory.CreateDirectory($@"{destFolderPath}\{schoolResult.Key.SchoolId}");
                if (!Directory.Exists($@"{reportFolder}\{schoolResult.Key.AreaName}"))
                {
                    Directory.CreateDirectory($@"{reportFolder}\{schoolResult.Key.AreaName}");
                }

                using (var excelTemplate = new XLWorkbook($@"{destFolderPath}\{templateName}"))
                {
                    using (var sheet = excelTemplate.Worksheets.First())
                    {
                        sheet.Cell(2, 1).Value = $"{schoolResult.Key.SchoolName}";
                        int i = 0;
                        foreach (var result in schoolResult)
                        {
                            sheet.Cell(i + 4, 2).Value = result.Surname;
                            sheet.Cell(i + 4, 3).Value = result.Name;
                            sheet.Cell(i + 4, 4).Value = result.SecondName;
                            sheet.Cell(i + 4, 5).Value = result.DocumNumber;
                            sheet.Cell(i + 4, 6).Value = result.TestName;
                            //sheet.Cell(i + 4, 7).Value = result.Marks;
                            sheet.Cell(i + 4, 7).Value = result.PrimaryMark;
                            sheet.Cell(i + 4, 8).Value = result.GradeStr;
                            i++;
                        }

                        

                        excelTemplate.SaveAs($@"{reportFolder}\{schoolResult.Key.AreaName}\{schoolResult.Key.SchoolName}.xlsx");
                    }
                }
            }
        }

        private ITakeEgeReportModel MapToReportModel(ParticipTest participTest)
        {
            return new ITakeEgeReportModel
            {
                AreaName = participTest.Particip.School.Area.Name.Trim(),
                SchoolId = participTest.Particip.SchoolId,
                SchoolName = participTest.Particip.School.Name.Trim(),
                Surname = participTest.Particip.Surname,
                Name = participTest.Particip.Name,
                SecondName = participTest.Particip.SecondName,
                DocumNumber = participTest.Particip.DocumNumber,
                TestName = participTest.ProjectTest.Test.Name,
                NumberCode = participTest.ProjectTest.Test.NumberCode,
                //AwardedMarks = participTest.QuestionMarks.Select(s => s.AwardedMark.ToString()),
                //Marks = participTest.QuestionMarks.Select(s => s.AwardedMark.ToString()).Aggregate((s1, s2) => $"{s1};{s2}"),
                PrimaryMark = participTest.PrimaryMark.HasValue ? (int?)participTest.PrimaryMark : null,
                GradeStr = GetGradeStr(participTest)
            };
        }

        private string GetGradeStr(ParticipTest participTest)
        {
            if (participTest.Grade5 == 5)
                return "зачет";
            else if (participTest.Grade5 == 2)
                return "незачет";
            else if (participTest.Grade5 < 0)
                return "отсутствовал";
            else
                throw new ArgumentException("something went wrong");
        }
    }

    internal class ITakeEgeReportModel
    {
        public string AreaName { get; set; }
        public string SchoolId { get; set; }
        public string SchoolName { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string DocumNumber { get; set; }
        public string TestName { get; set; }
        public string NumberCode { get; set; }
        public string Marks { get; set; }
        //public IEnumerable<string> AwardedMarks { get; set; }
        public int? PrimaryMark { get; set; }
        //public bool IsPass { get; set; }
        public string GradeStr { get; set; }
    }

    //internal static class ITakeEgeReporterHelpers
    //{
    //    public static IEnumerable<ITakeEgeReportModel> GetMarks(this IEnumerable<ITakeEgeReportModel> reports)
    //    {
    //        foreach (var report in reports)
    //        {
    //            report.Marks = report.AwardedMarks.Aggregate((s1, s2) => $"{s1};{s2}");
    //        }

    //        return reports;
    //    }
    //}
}
