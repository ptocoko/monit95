using ClosedXML.Excel;
using Ionic.Zip;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.OneTwoThree.QuestionProtocol;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProtocolGenerator
{
    public class OneTwoThree
    {
        private readonly CokoContext context;
        private readonly GradeSolver gradeSolver;
        private readonly int projectId;
        private readonly string destFolder;

        private IQueryable<ParticipTest> query;

        private readonly Dictionary<int, int[]> projectTestIdsByTestCode = new Dictionary<int, int[]>
        {
            [1] = new int[] { 3069, 3072, 3075 },
            [2] = new int[] { 3070, 3073, 3076 },
            [21] = new int[] { 3071, 3074, 3077 }
        };

        public OneTwoThree(CokoContext context, GradeSolver gradeSolver, int projectId)
        {
            this.context = context;
            this.gradeSolver = gradeSolver;
            this.projectId = projectId;
            destFolder = $@"D:\Work";

            query = context.ParticipTests.AsNoTracking()
                .Where(pt => pt.ProjectTest.ProjectId == projectId && pt.Grade5 > 0)
                .Include("OneTwoThreeQuestionMarks.OneTwoThreeQuestion")
                .Include("ProjectTest.Test")
                .Include("Particip.Class");
        }


        public void SolveGrades()
        {
            var participTests = context.ParticipTests.Where(pt => pt.ProjectTestId == 2035 && pt.Grade5 > 0).Include(inc => inc.OneTwoThreeQuestionMarks);

            ////gradeSolver.SolveForRussianByList(participTests);
            ////Console.WriteLine("russian is over!");

            ////gradeSolver.SolveForMathByList(participTests);
            ////Console.WriteLine("math is over!");

            //gradeSolver.SolveForReadingByList(participTests);
            //Console.WriteLine("reading is over!");
            gradeSolver.HotFixForFirstClassReading(participTests);

            context.SaveChanges();
            //throw new NotImplementedException();
        }

        public void GetAndSavePrimaryMark()
        {
            var participTests = context.ParticipTests.Where(pt => new int[] { 2033, 2034, 2035 }.Contains(pt.ProjectTestId) && pt.Grade5 > 0).Include(inc => inc.OneTwoThreeQuestionMarks);

            foreach (var pt in participTests)
            {
                pt.PrimaryMark = pt.OneTwoThreeQuestionMarks.Select(s => s.AwardedMark).Sum();
            }

            context.SaveChanges();
        }
        
        public void GenerateExcelReports(string [] schoolIds = null)
        {
            var destFolder = $@"\\192.168.88.223\файлы_пто\Работы\[2016-77] - 1-3 классы\2020\отчеты";
            if (!Directory.Exists(destFolder))
                Directory.CreateDirectory(destFolder);

            foreach (var projectTestId in new [] { 3092, 3093, 3094, 3095, 3096, 3097, 3098, 3099, 3100 })
            {
                Console.WriteLine();
                Console.WriteLine($"projectTest {projectTestId} starter");
                Console.WriteLine();
                var templatePath = $@"\\192.168.88.223\файлы_пто\Работы\[2016-77] - 1-3 классы\2020\отчеты\templates\{projectTestId}\template.xlsx";
                
                var schoolids = context.ParticipTests.AsNoTracking()
                    .Where(pt => pt.ProjectTestId == projectTestId && pt.Grade5.HasValue && pt.Grade5 > 0)
                    .Select(pt => new
                    {
                        pt.Particip.SchoolId,
                        SchoolName = pt.Particip.School.Name.Trim(),
                        AreaName = pt.Particip.School.Area.Name.Trim()
                    })
                    .Distinct()
                    .ToList();

                //var projectTestRes =
                //    .Include("Particip.School.Area")
                //    .Include("OneTwoThreeQuestionMarks.OneTwoThreeQuestion")
                //    .Include("ProjectTest.Test")
                //    .Include("Particip.Class")
                //    .ToList();

                foreach (var school in schoolids.Where(p => schoolIds?.Contains(p.SchoolId) ?? true))
                {
                    Console.WriteLine($"started for {school.SchoolId}");

                    var schoolRes = context.ParticipTests
                        .Where(pt => pt.Particip.SchoolId == school.SchoolId && pt.ProjectTestId == projectTestId && pt.Grade5.HasValue && pt.Grade5 > 0)
                        //.Where(pt => )
                        .AsEnumerable()
                        .Select(MapToDto)
                        .OrderBy(ob => ob.ClassId).ThenBy(tb => tb.Surname).ThenBy(tb => tb.Name)
                        .GroupBy(gb => new { gb.ClassId, gb.ClassName, gb.TestName });

                    var schoolFolder = $@"{destFolder}\{school.SchoolId}";

                    foreach (var classResults in schoolRes)
                    {
                        using (var excel = new XLWorkbook(templatePath))
                        {
                            var sheet = excel.Worksheets.First();

                            sheet.Cell(1, 1).Value = $"Протокол проверки результатов диагностических работ в {classResults.Key.ClassName} классе {classResults.Key.TestName}";
                            int i = 5;
                            foreach (var res in classResults)
                            {
                                WriteDownResult(sheet, i, res);

                                i++;
                            }
                        
                            sheet.Cell(i, 2).Value = "% выполнения заданий";
                            sheet.Cell(i, 2).Style.Fill.BackgroundColor = XLColor.LightGray;
                            sheet.Cell(i, 2).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            for(int j = 5; j < classResults.First().Marks.Count() + 5; j++)
                            {
                                sheet.Cell(i, j).Style.NumberFormat.NumberFormatId = 9;
                                sheet.Cell(i, j).Value =
                                    Math.Round((double)classResults.Select(cr => cr.Marks[j - 5]).Sum() / (double)classResults.Select(cr => cr.MaxMarks[j - 5]).Sum(), 2, MidpointRounding.AwayFromZero);
                            }

                            foreach (var cell in sheet.Range(i, 5, i, classResults.First().Marks.Length + 4).Cells())//.Cells(cell => (int)cell.Value <= 50))
                            {
                                if (Convert.ToDouble(cell.Value) <= 0.5)
                                {
                                    sheet.Cell(4, cell.Address.ColumnNumber).Style.Fill.BackgroundColor = XLColor.Red;
                                    cell.Style.Fill.BackgroundColor = XLColor.Red;
                                }
                            }

                            var generalResultsRange = sheet.Range(3, 1, i, classResults.First().Marks.Count() + 7);
                            generalResultsRange.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            generalResultsRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                            generalResultsRange.Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
                            generalResultsRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                            generalResultsRange.Style.Font.FontSize = 14;
                            generalResultsRange.Style.Font.Bold = true;
                            generalResultsRange.Style.Alignment.WrapText = true;
                            sheet.Rows(5, i).Height = 38.25;

                            var participStatsRowNumber = 11;
                            var participStatsFirstColumnNumber = classResults.First().Marks.Length + 9;
                            WriteDownParticipStats(sheet, participStatsRowNumber, participStatsFirstColumnNumber, classResults);

                            var participStatsRange = sheet.Range(participStatsRowNumber, participStatsFirstColumnNumber, participStatsRowNumber, participStatsFirstColumnNumber + 9);
                            participStatsRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                            participStatsRange.Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
                            participStatsRange.Style.Font.FontSize = 10;
                            participStatsRange.Style.Font.Bold = true;

                            // второй лист не нужен
                            //using (var sheet = excel.Worksheets.ToArray()[1])
                            //{
                            //    sheet.Cell(2, 2).Value = $"{classResults.Key.TestName}: Выполнение заданий учащимися {classResults.Key.ClassName} класса";

                            //    var resDict = new Dictionary<int, int>();
                            //    for(int i = 0; i < classResults.First().Marks.Length; i++)
                            //    {
                            //        var questionRes = (int)Math.Round((double)classResults.Select(cr => cr.Marks[i]).Sum() * 100 / classResults.Select(cr => cr.MaxMarks[i]).Sum(), 0, MidpointRounding.AwayFromZero);
                            //        resDict.Add(i + 1, questionRes);
                            //    }

                            //    var orderedDict = resDict.OrderByDescending(ob => ob.Value);

                            //    int j = 0;
                            //    foreach (var res in orderedDict)
                            //    {
                            //        sheet.Cell(j, 2).Value = $"Задание №{res.Key}";
                            //        sheet.Cell(j, 3).Value = res.Value;
                            //        sheet.Cell(j, 3).Style.Fill.BackgroundColor = res.Value > 50 ? XLColor.Blue : XLColor.Red;
                            //    }
                            //}

                            excel.SaveAs($@"{schoolFolder}\{classResults.Key.ClassName.First()}\{classResults.Key.TestName.Substring(0, 2).ToLower()}.xlsx");
                        }
                    }

                    //using (var zip = new ZipFile(Encoding.UTF8))
                    //{
                    //    zip.AddDirectory(schoolFolder, "");
                    //    zip.Save($@"{destFolder}\{school.SchoolId}.zip");
                    //}
                }
            }
        }

        private static void WriteDownResult(IXLWorksheet sheet, int i, OneTwoThreeReportModel res)
        {
            sheet.Cell(i, 1).Value = i - 4;
            sheet.Cell(i, 2).Value = $"{res.Surname} {res.Name} {res.SecondName}";
            sheet.Cell(i, 3).Value = res.TestName;
            sheet.Cell(i, 4).Value = res.OptionNumber;

            for(int j = 0; j < res.Marks.Count(); j++)
            {
                sheet.Cell(i, j + 5).Value = res.Marks[j];
            }

            sheet.Cell(i, res.Marks.Length + 5).Value = res.PerformanceOfGeneralTasks;
            sheet.Cell(i, res.Marks.Length + 6).Value = res.PerformanceOfAdditionalTasks;
            sheet.Cell(i, res.Marks.Length + 7).Value = res.GradeLevel;
        }

        //private static void SetResultsTableBorders()

        private static void WriteDownParticipStats(IXLWorksheet sheet, int rowNumber, int firstColumnNumber, IGrouping<object, OneTwoThreeReportModel> classResults)
        {
            sheet.Cell(rowNumber, firstColumnNumber).Value = classResults.Count();

            sheet.Cell(rowNumber, firstColumnNumber + 1).Value = classResults.Count(cr => cr.Grade5 == 2);
            sheet.Cell(rowNumber, firstColumnNumber + 2).SetFormulaR1C1($"=R{rowNumber}C{firstColumnNumber + 1}/R{rowNumber}C{firstColumnNumber}");

            sheet.Cell(rowNumber, firstColumnNumber + 3).Value = classResults.Count(cr => cr.Grade5 == 3);
            sheet.Cell(rowNumber, firstColumnNumber + 4).SetFormulaR1C1($"=R{rowNumber}C{firstColumnNumber + 3}/R{rowNumber}C{firstColumnNumber}");

            sheet.Cell(rowNumber, firstColumnNumber + 5).Value = classResults.Count(cr => cr.Grade5 == 4);
            sheet.Cell(rowNumber, firstColumnNumber + 6).SetFormulaR1C1($"=R{rowNumber}C{firstColumnNumber + 5}/R{rowNumber}C{firstColumnNumber}");

            sheet.Cell(rowNumber, firstColumnNumber + 7).Value = classResults.Count(cr => cr.Grade5 == 5);
            sheet.Cell(rowNumber, firstColumnNumber + 8).SetFormulaR1C1($"=R{rowNumber}C{firstColumnNumber + 7}/R{rowNumber}C{firstColumnNumber}");
        }

        private OneTwoThreeReportModel MapToDto(ParticipTest participTest)
        {
            return new OneTwoThreeReportModel
            {
                Surname = participTest.Particip.Surname,
                Name = participTest.Particip.Name,
                SecondName = participTest.Particip.SecondName,
                ClassId = participTest.Particip.ClassId,
                ClassName = participTest.Particip.Class.Name.Trim(),
                TestName = participTest.ProjectTest.Test.Name.Trim(),
                TestCode = participTest.ProjectTest.Test.NumberCode,
                TotalMark = (int)GetTotalMark(participTest),
                PerformanceOfGeneralTasks = (int)GetGeneralPerformance(participTest),
                PerformanceOfAdditionalTasks = (int)GetAdditionalPerformance(participTest),
                Grade5 = participTest.Grade5.Value,
                GradeLevel = participTest.GradeString,
                OptionNumber = participTest.OptionNumber,
                Marks = participTest.OneTwoThreeQuestionMarks.Select(qm => qm.AwardedMark).ToArray(),
                MaxMarks = participTest.OneTwoThreeQuestionMarks.Select(qm => qm.OneTwoThreeQuestion.MaxMark).ToArray()
            };
        }

        private static double GetTotalMark(ParticipTest participTest)
        {
            return (participTest.OneTwoThreeQuestionMarks.Select(qm => (double)qm.AwardedMark).Sum() 
                / participTest.OneTwoThreeQuestionMarks.Select(qm => (double)qm.OneTwoThreeQuestion.MaxMark).Sum()) * 100;
        }

        private static double GetGeneralPerformance(ParticipTest participTest)
        {
            var generalPartMarks = participTest.OneTwoThreeQuestionMarks.Where(p => p.OneTwoThreeQuestion.IsGeneralPart);
            var marksByNumber = generalPartMarks.GroupBy(gb => gb.OneTwoThreeQuestion.Number).Select(s => s.Select(s2 => (double)s2.AwardedMark).Sum());

            return ((double)marksByNumber.Count(p => p != 0) / (double)marksByNumber.Count()) * 100;
        }

        private static double GetAdditionalPerformance(ParticipTest participTest)
        {
            return (participTest.OneTwoThreeQuestionMarks.Where(qm => !qm.OneTwoThreeQuestion.IsGeneralPart).Select(qm => (double)qm.AwardedMark).Sum()
                / participTest.OneTwoThreeQuestionMarks.Where(qm => !qm.OneTwoThreeQuestion.IsGeneralPart).Select(qm => (double)qm.OneTwoThreeQuestion.MaxMark).Sum()) * 100;
        }
    }

    public class OneTwoThreeReportModel
    {
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassId { get; set; }
        public string ClassName { get; set; }
        public string TestName { get; set; }
        public string TestCode { get; set; }
        public int TotalMark { get; set; }
        public int PerformanceOfGeneralTasks { get; set; }
        public int PerformanceOfAdditionalTasks { get; set; }
        public int Grade5 { get; set; }
        public string GradeLevel { get; set; }
        public short? OptionNumber { get; set; }
        public int[] Marks { get; set; }
        public int[] MaxMarks { get; set; }
    }
}
