using ClosedXML.Excel;
using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Extensions;
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

        Random rand = new Random();
        public Dictionary<int, string> testNameDict = new Dictionary<int, string>
        {
            [2033] = "русский язык",
            [2034] = "математика",
            [2035] = "чтение"
        };

        public ITakeEge(CokoContext context, int projectId)
        {
            this.context = context;
            this.projectId = projectId;
        }

        public IQueryable<ParticipTest> GetCorrectParticipTestsQuery() => context.ParticipTests
            .AsNoTracking()
            .Where(p => p.ProjectTest.ProjectId == projectId && p.Particip.SchoolId != "0000" && p.Grade5.HasValue);// && p.Grade5 != -1);

        public void SolveAndSaveGrade5(int[] projectTestIds)
        {
            var participTests = context.ParticipTests
                .Where(p => projectTestIds.Contains(p.ProjectTestId) && p.PrimaryMark.HasValue)
                .Include(inc => inc.ProjectTest);

            foreach (var participTest in participTests)
            {
                participTest.Grade5 = (int?)participTest.PrimaryMark >= participTest.ProjectTest.PassPrimaryMark ? 5 : 2;
            }

            context.SaveChanges();
        }

        public async Task SolveGrade5_v2()
        {
            await context.ParticipTests
                .Where(pt => pt.ProjectTestId == 3086 && pt.Grade5.HasValue && pt.Grade5.Value > 0)
                .ForEachAsync(pt =>
                {
                    var marksSum = pt.QuestionMarks.Where(qm => qm.QuestionId != 2163).Select(qm => qm.AwardedMark).Sum();

                    pt.Grade5_v2 = (int)marksSum >= 10 ? 5 : 2;
                    //pt.Grade5_v2 = pt.PrimaryMark >= 9 ? 5 : 2;
                });

            context.SaveChanges();
        }

        public void SolveGrade5IgnoringQuestions(int[] questionIds, int projectTestId, int passPrimaryMark, bool is_v2Grade)
        {
            var participTests = context.ParticipTests
                .Where(pt => pt.ProjectTestId == projectTestId && pt.PrimaryMark.HasValue)
                .Include("QuestionMarks");

            foreach (var participTest in participTests)
            {
                var marksSum = participTest.QuestionMarks.Where(qm => !questionIds.Contains(qm.QuestionId)).Select(qm => qm.AwardedMark).Sum();
                if (is_v2Grade)
                {
                    participTest.Grade5_v2 = (int)marksSum >= passPrimaryMark ? 5 : 2;
                }
                else
                {
                    participTest.Grade5 = (int)marksSum >= passPrimaryMark ? 5 : 2;
                }
            }

            context.SaveChanges();
        }

        public void SetPrimaryMark_v2IngoringQuestionIds(int[] questionIds, int projectTestId)
        {
            var participTests = context.ParticipTests
                .Where(pt => pt.ProjectTestId == projectTestId && pt.PrimaryMark.HasValue)
                .Include("QuestionMarks");

            foreach (var participTest in participTests)
            {
                participTest.PrimaryMark_v2 = (int)participTest.QuestionMarks.Where(qm => !questionIds.Contains(qm.QuestionId)).Select(qm => qm.AwardedMark).Sum();
            }

            context.SaveChanges();
        }

        public void GenerateForAllSchools(string path, string templateName, bool isArchieving)
        {
            var participTests = GetCorrectParticipTestsQuery();

            GenerateReports(participTests, path, templateName, isArchieving);
        }

        public void GenerateForAllAreas(string path, string templateName, bool isArchieving)
        {
            var participTests = GetCorrectParticipTestsQuery();

            GenerateReportsForAreas(participTests, path, templateName, isArchieving);
        }

        public void GenerateReportsForSchools(string[] schoolIds, string path, string templateName, bool isArchieving)
        {
            var participTests = GetCorrectParticipTestsQuery().Where(p => schoolIds.Contains(p.Particip.SchoolId));

            GenerateReports(participTests, path, templateName, isArchieving);
        }

        public void GenerateReportsForAreas()
        {
            var groupedTestResults = context.ParticipTests
                .Where(pt => pt.ProjectTestId == 3084 && pt.Grade5.HasValue)
                //.OrderBy(ob => ob.Particip.SchoolId).ThenBy(ob => ob.Particip.Surname).ThenBy(tb => tb.Particip.Name).ThenBy(tb => tb.ProjectTest.Test.NumberCode)
                .Select(MapToReportModel)
                .OrderBy(ob => ob.SchoolId).ThenBy(ob => ob.Surname).ThenBy(tb => tb.Name).ThenBy(tb => tb.NumberCode)
                .GroupBy(gb => new { gb.AreaName, gb.AreaCode });

            string reportFolder = $@"D:\Work\iTakeSociety";

            foreach (var areaResult in groupedTestResults)
            {
                using (var excel = new XLWorkbook($@"{reportFolder}\template society area.xlsx"))
                {
                    var sheet = excel.Worksheets.First();
                    sheet.Cell(2, 1).Value = $"{areaResult.Key.AreaName}";
                    int i = 4;
                    foreach (var result in areaResult)
                    {
                        sheet.Cell(i, 1).Value = i - 3;
                        sheet.Cell(i, 2).Value = result.Surname;
                        sheet.Cell(i, 3).Value = result.Name;
                        sheet.Cell(i, 4).Value = result.SecondName;
                        sheet.Cell(i, 5).Value = result.SchoolName;
                        sheet.Cell(i, 6).Value = result.DocumNumber;
                        //sheet.Cell(i, 6).Value = result.TestName;
                        //sheet.Cell(i, 7).Value = result.SchoolName;
                        //sheet.Cell (i, 7).Value = result.Marks;
                        sheet.Cell(i, 7).Value = result.PrimaryMark;
                        sheet.Cell(i, 8).Value = result.GradeStr;
                        i++;
                    }

                    //sheet.RowsUsed(false).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                    //sheet.RowsUsed(false).Style.Border.SetOutsideBorder(XLBorderStyleValues.Medium);
                    excel.SaveAs($@"{reportFolder}\122019\{areaResult.Key.AreaCode}.xlsx");
                    
                }
            }
        }

        public void F0_ParticipsResults()
        {
            var destFolder = $@"D:\Work\reports\1-е классы отчеты\Ф0. Таблица результатов участников";

            var entities = context.ParticipTests
                .AsNoTracking()
                .Where(p => new int[] { 2033, 2034, 2035 }.Contains(p.ProjectTestId) && p.Grade5.HasValue && p.Grade5 > 0)
                .Select(MapToReportDto())
                .GroupBy(gb => new { gb.SchoolName, gb.AreaName });

            foreach (var schoolResults in entities)
            {
                foreach (var testResults in schoolResults.GroupBy(gb => gb.ProjectTestId))
                {
                    using (var excel = new XLWorkbook($@"{destFolder}\temp.xlsx"))
                    {
                        var sheet = excel.Worksheets.First();
                        for (int i = 0; i < testResults.Count(); i++)
                        {
                            var orderedResults = testResults.OrderByDescending(ob => ob.PrimaryMark);
                            var res = orderedResults.ToArray()[i];

                            sheet.Cell(i + 2, 1).Value = res.Id;
                            sheet.Cell(i + 2, 2).Value = res.Surname;
                            sheet.Cell(i + 2, 3).Value = res.Name;
                            sheet.Cell(i + 2, 4).Value = res.SecondName;
                            sheet.Cell(i + 2, 5).Value = rand.Next(1, 4);
                            sheet.Cell(i + 2, 6).Value = res.Marks.Select(s => s.ToString()).Aggregate((s1, s2) => $"{s1};{s2}");
                            sheet.Cell(i + 2, 7).Value = res.PrimaryMark;

                            var gradeStrCell = sheet.Cell(i + 2, 8);
                            StyleGradeCell(res.Grade5, gradeStrCell);

                            sheet.Cell(i + 2, 8).Value = res.GradeString;
                        }
                        sheet.Name = testNameDict[testResults.Key];
                        
                        excel.SaveAs($@"{destFolder}\{schoolResults.Key.AreaName}\{schoolResults.Key.SchoolName.RemoveInvalidPathChars()}\{testNameDict[testResults.Key]}.xlsx");
                    }
                }
            }
        }

        public void F0_IndividualResults()
        {
            var destFolder = @"D:\Work\reports\1-е классы отчеты\Ф0. Индивидуальные результаты участников";
            var tempPath = $@"{destFolder}\temp.xlsx";

            foreach (var report in context.ParticipTests
                .AsNoTracking()
                .Where(p => new int[] { 2033, 2034, 2035 }.Contains(p.ProjectTestId) && p.Grade5.HasValue && p.Grade5 > 0)
                .Select(MapToReportDto()))
            {
                using (var excel = new XLWorkbook(tempPath))
                {
                    var sheet = excel.Worksheets.First();
                    sheet.Cell(2, 1).Value = report.Id;
                    sheet.Cell(2, 2).Value = report.Surname;
                    sheet.Cell(2, 3).Value = report.Name;
                    sheet.Cell(2, 4).Value = report.SecondName;
                    sheet.Cell(2, 5).Value = rand.Next(1, 4);
                    sheet.Cell(2, 6).Value = report.Marks.Select(s => s.ToString()).Aggregate((s1, s2) => $"{s1};{s2}");
                    sheet.Cell(2, 7).Value = report.PrimaryMark;

                    var gradeCell = sheet.Cell(2, 8);
                    gradeCell.Value = report.GradeString;
                    StyleGradeCell(report.Grade5, gradeCell);
                    
                    excel.SaveAs($@"{destFolder}\{report.AreaName}\{report.SchoolName.RemoveInvalidPathChars()}\{testNameDict[report.ProjectTestId]}\{report.Surname.RemoveInvalidPathChars()} {report.Name.RemoveInvalidPathChars()} {report.SecondName.RemoveInvalidPathChars()}.xlsx");
                }
            }
        }

        public void F1_IndividualResults()
        {
            var destFolder = @"D:\Work\reports\1-е классы отчеты\Ф1. Индивидуальные результаты участников";
            var tempPath = $@"{destFolder}\temp.xlsx";

            var entities = context.ParticipTests
                .Where(p => new int[] { 2033, 2034, 2035 }.Contains(p.ProjectTestId) && p.Grade5.HasValue && p.Grade5 > 0)
                .OrderBy(ob => ob.Particip.School.AreaCode)
                .ThenBy(tb => tb.Particip.SchoolId)
                .ThenBy(tb => tb.ProjectTestId)
                .ThenBy(tb => tb.Particip.Surname)
                .ThenBy(tb => tb.Particip.Name)
                .Select(MapToReportDto())
                .GroupBy(gb => gb.ProjectTestId);

            using (var excel = new XLWorkbook(tempPath))
            {
                int i = 0;

                foreach (var testResults in entities)
                {
                    //if (excel.Worksheets.Count <= i)
                    //{
                    //    excel.Worksheets.Add("Лист" + i + 1);
                    //}

                    var sheet = excel.Worksheets.ToArray()[i];
                    //if (i > 0)
                    //{
                    //    var header = excel.Worksheets.ToArray()[i - 1].Range("A1:I1");
                    //    sheet.Rows().
                    //}

                    sheet.Name = testNameDict[testResults.Key];

                    int j = 2;
                    foreach (var res in testResults)
                    {
                        sheet.Cell(j, 1).Value = res.Id;
                        sheet.Cell(j, 2).Value = res.VprCode;
                        sheet.Cell(j, 3).Value = res.Surname;
                        sheet.Cell(j, 4).Value = res.Name;
                        sheet.Cell(j, 5).Value = res.SecondName;
                        sheet.Cell(j, 6).Value = rand.Next(1, 4);
                        sheet.Cell(j, 7).Value = res.PrimaryMark;
                        sheet.Cell(j, 8).Value = res.Marks.Select(s => s.ToString()).Aggregate((s1, s2) => $"{s1};{s2}");

                        var gradeCell = sheet.Cell(j, 9);
                        gradeCell.Value = res.GradeString;
                        StyleGradeCell(res.Grade5, gradeCell);
                            
                        j++;
                    }

                    sheet.RangeUsed(false).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    sheet.RangeUsed(false).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                    

                    i++;
                }

                excel.SaveAs(destFolder + @"\результаты.xlsx");
            }
        }

        private void GenerateReportsForAreas(IQueryable<ParticipTest> participTests, string path, string templateName, bool isArchieving)
        {
            var groupedTestResults = participTests
                .Include("Particip.School.Area")
                .Include("ProjectTest.Test")
                .ToList()
                .Select(MapToReportModel)
                .OrderBy(ob => ob.SchoolId).ThenBy(ob => ob.Surname).ThenBy(tb => tb.Name).ThenBy(tb => tb.NumberCode)
                .GroupBy(gb => new { gb.AreaCode, gb.AreaName });

            string tempPath = $@"{path}\{templateName}";

            foreach (var areaResult in groupedTestResults)
            {
                using (var excel = new XLWorkbook(tempPath))
                {
                    var sheet = excel.Worksheets.First();
                    sheet.Cell(2, 1).Value = $"{areaResult.Key.AreaCode} - {areaResult.Key.AreaName}";
                    int i = 0;
                    foreach (var result in areaResult)
                    {
                        sheet.Cell(i + 4, 2).Value = result.SchoolName;
                        sheet.Cell(i + 4, 3).Value = result.Surname;
                        sheet.Cell(i + 4, 4).Value = result.Name;
                        sheet.Cell(i + 4, 5).Value = result.SecondName;
                        sheet.Cell(i + 4, 6).Value = result.DocumNumber;
                        sheet.Cell(i + 4, 7).Value = result.TestName;
                        sheet.Cell(i + 4, 8).Value = result.PrimaryMark;
                        sheet.Cell(i + 4, 9).Value = result.RiskGroup;
                        sheet.Cell(i + 4, 10).Value = result.GradeStr;
                        i++;
                    }

                    excel.SaveAs($@"{path}\{areaResult.Key.AreaCode}.xlsx");

                    if (isArchieving)
                    {
                        using (var zip = new ZipFile())
                        {
                            zip.AddFile($@"{path}\{areaResult.Key.AreaCode}.xlsx", "");
                            zip.Save($@"{path}\{areaResult.Key.AreaCode}.zip");
                        }

                        System.IO.File.Delete($@"{path}\{areaResult.Key.AreaCode}.xlsx");
                    }
                }
            }
        }

        private void GenerateReports(IQueryable<ParticipTest> participTests, string path, string templateName, bool isArchieving)
        {
            var groupedTestResults = participTests
                .Include("Particip.School.Area")
                .Include("ProjectTest.Test")
                .ToList()
                //.OrderBy(ob => ob.Particip.SchoolId).ThenBy(ob => ob.Particip.Surname).ThenBy(tb => tb.Particip.Name).ThenBy(tb => tb.ProjectTest.Test.NumberCode)
                .Select(MapToReportModel)
                .OrderBy(ob => ob.Surname).ThenBy(tb => tb.Name).ThenBy(tb => tb.NumberCode)
                .GroupBy(gb => new { gb.SchoolId, gb.SchoolName, gb.AreaName });

            // string path = @"D:\Work\ITakeEge\092019";
            string tempPath = $@"{path}\{templateName}";

            foreach (var schoolResult in groupedTestResults)
            {
                //if (!Directory.Exists($@"{destFolderPath}\{schoolResult.Key.SchoolId}"))
                //    Directory.CreateDirectory($@"{destFolderPath}\{schoolResult.Key.SchoolId}");
                //if (!Directory.Exists($@"{reportFolder}\{schoolResult.Key.AreaName}"))
                //{
                //    Directory.CreateDirectory($@"{reportFolder}\{schoolResult.Key.AreaName}");
                //}


                using (var excelTemplate = new XLWorkbook(tempPath))
                {
                    var sheet = excelTemplate.Worksheets.First();
                    sheet.Cell(2, 1).Value = $"{schoolResult.Key.SchoolName}, {schoolResult.Key.AreaName}";
                    int i = 0;
                    foreach (var result in schoolResult)
                    {
                        sheet.Cell(i + 4, 2).Value = result.Surname;
                        sheet.Cell(i + 4, 3).Value = result.Name;
                        sheet.Cell(i + 4, 4).Value = result.SecondName;
                        sheet.Cell(i + 4, 5).Value = result.DocumNumber;
                        //sheet.Cell(i + 4, 6).Value = result.TestName;
                        //sheet.Cell(i + 4, 7).Value = result.ClassName;
                        //sheet.Cell(i + 4, 7).Value = result.Marks;
                        sheet.Cell(i + 4, 6).Value = result.PrimaryMark;
                        //sheet.Cell(i + 4, 8).Value = result.RiskGroup;
                        sheet.Cell(i + 4, 7).Value = result.GradeStr;
                        i++;
                    }
                        
                    excelTemplate.SaveAs($@"{path}\{schoolResult.Key.SchoolId}.xlsx");
                    
                }

                if (isArchieving)
                {
                    using (var zip = new ZipFile())
                    {
                        zip.AddFile($@"{path}\{schoolResult.Key.SchoolId}.xlsx", "");
                        zip.Save($@"{path}\{schoolResult.Key.SchoolId}.zip");
                    }

                    System.IO.File.Delete($@"{path}\{schoolResult.Key.SchoolId}.xlsx");
                }
            }
        }

        private ITakeEgeReportModel MapToReportModel(ParticipTest participTest)
        {
            return new ITakeEgeReportModel
            {
                AreaCode = participTest.Particip.School.AreaCode,
                AreaName = participTest.Particip.School.Area.Name.Trim(),
                SchoolId = participTest.Particip.SchoolId,
                SchoolName = participTest.Particip.School.Name.Trim(),
                Surname = participTest.Particip.Surname,
                Name = participTest.Particip.Name,
                SecondName = participTest.Particip.SecondName,
                ClassName = participTest.Particip.Class?.Name.Trim(),
                DocumNumber = participTest.Particip.DocumNumber,
                TestName = participTest.ProjectTest.Test.Name,
                NumberCode = participTest.ProjectTest.Test.NumberCode,
                //AwardedMarks = participTest.QuestionMarks.Select(s => s.AwardedMark.ToString()),
                //Marks = participTest.QuestionMarks.Select(s => s.AwardedMark.ToString()).Aggregate((s1, s2) => $"{s1};{s2}"),
                PrimaryMark = participTest.PrimaryMark.HasValue ? (int?)participTest.PrimaryMark : null,
                RiskGroup = participTest.Grade5_v2.HasValue ? participTest.Grade5_v2 == 2 ? "да" : "нет" : " - ",
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

        private static void StyleGradeCell(int grade5, IXLCell gradeStrCell)
        {
            gradeStrCell.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
            if (grade5 == 2)
            {
                gradeStrCell.Style.Fill.BackgroundColor = XLColor.PersianRed;
            }
            else if (grade5 == 3)
            {
                gradeStrCell.Style.Fill.BackgroundColor = XLColor.Yellow;
            }
            else
            {
                gradeStrCell.Style.Fill.BackgroundColor = XLColor.ForestGreen;
            }
        }

        private static System.Linq.Expressions.Expression<Func<ParticipTest, ReportDto>> MapToReportDto()
        {
            return s => new ReportDto
            {
                Id = s.Id,
                Surname = s.Particip.Surname,
                Name = s.Particip.Name,
                SecondName = s.Particip.SecondName,
                SchoolName = s.Particip.School.Name.Trim(),
                VprCode = s.Particip.School.VprCode,
                AreaName = s.Particip.School.Area.Name.Trim(),
                ProjectTestId = s.ProjectTestId,
                Marks = s.OneTwoThreeQuestionMarks.Select(qm => qm.AwardedMark),
                PrimaryMark = (int)s.PrimaryMark,
                Grade5 = s.Grade5.Value,
                GradeString = s.GradeString
            };
        }
    }

    internal class ReportDto
    {
        public int Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string SchoolName { get; set; }
        public int ProjectTestId { get; set; }
        public string AreaName { get; set; }
        public int AreaCode { get; set; }
        public IEnumerable<int> Marks { get; set; }
        public int PrimaryMark { get; set; }
        public int Grade5 { get; set; }
        public string GradeString { get; set; }
        public string VprCode { get; set; }
    }

    internal class ITakeEgeReportModel
    {
        public string AreaName { get; set; }
        public int AreaCode { get; set; }
        public string SchoolId { get; set; }
        public string SchoolName { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassName { get; set; }
        public string DocumNumber { get; set; }
        public string TestName { get; set; }
        public string NumberCode { get; set; }
        public string Marks { get; set; }
        public string RiskGroup { get; set; }
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
