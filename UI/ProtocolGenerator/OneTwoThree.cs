using ClosedXML.Excel;
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
            var schoolids = context.ParticipTests.AsNoTracking()
                .Where(pt => pt.ProjectTest.ProjectId == 22 && pt.Grade5 > 0)
                .Select(pt => new
                {
                    pt.Particip.SchoolId,
                    SchoolName = pt.Particip.School.Name.Trim(),
                    AreaName = pt.Particip.School.Area.Name.Trim()
                })
                .Distinct()
                .ToList();

            foreach (var school in schoolids.Where(p => schoolIds.Contains(p.SchoolId)))
            {
                Console.WriteLine($"started for {school.SchoolId}");

                var schoolRes = query
                    .Where(pt => pt.Particip.SchoolId == school.SchoolId)
                    //.AsEnumerable()
                    .Select(MapToDto)
                    .OrderBy(ob => ob.ClassId).ThenBy(tb => tb.Surname).ThenBy(tb => tb.Name)
                    .GroupBy(gb => new { gb.ClassId, gb.ClassName, gb.TestName });

                
                if (!Directory.Exists($@"{destFolder}\res\{school.AreaName}\{school.SchoolName}"))
                    Directory.CreateDirectory($@"{destFolder}\res\{school.AreaName}\{school.SchoolName}");

                foreach (var classResults in schoolRes)
                {
                    using (var excel = new XLWorkbook($@"{destFolder}\template_onetwothree.xlsx"))
                    {
                        using (var sheet = excel.Worksheets.First())
                        {
                            sheet.Cell(1, 1).Value = $"Протокол проверки результатов диагностических работ в {classResults.Key.ClassName} классе {classResults.Key.TestName}";
                            int i = 0;
                            foreach (var res in classResults)
                            {
                                WriteDownResult(sheet, i, res);

                                i++;
                            }

                            sheet.Cell(i, 2).Value = "% выполнения заданий";
                            sheet.Cell(i, 2).Style.Fill.BackgroundColor = XLColor.LightGray;
                            sheet.Row(i).Style.Font.Bold = true;
                            sheet.Cell(i, 2).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            for(int j = 0; j < classResults.First().Marks.Count(); j++)
                            {
                                sheet.Cell(i, j + 5).DataType = XLCellValues.Number;
                                sheet.Cell(i, j + 5).Value = 
                                    Math.Round((double)classResults.Select(cr => cr.Marks[j]).Sum() * 100 / classResults.Select(cr => cr.MaxMarks[j]).Sum(), 0, MidpointRounding.AwayFromZero);
                            }

                            excel.SaveAs($@"{destFolder}\res\{school.AreaName}\{school.SchoolName}.xlsx");
                        }
                    }
                }
            }
        }

        private static void WriteDownResult(IXLWorksheet sheet, int i, OneTwoThreeReportModel res)
        {
            sheet.Cell(i + 5, 1).Value = i + 5;
            sheet.Cell(i + 5, 2).Value = $"{res.Surname} {res.Name} {res.SecondName}";
            sheet.Cell(i + 5, 3).Value = res.TestName;
            sheet.Cell(i + 5, 4).Value = res.OptionNumber;

            for(int j = 0; j < res.Marks.Count(); j++)
            {
                sheet.Cell(i + 5, j + 5).Value = res.Marks[j];
            }

            sheet.Cell(i + 5, 8).Value = res.PerformanceOfGeneralTasks;
            sheet.Cell(i + 5, 9).Value = res.PerformanceOfAdditionalTasks;
            sheet.Cell(i + 5, 10).Value = res.GradeLevel;
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
        public string GradeLevel { get; set; }
        public short? OptionNumber { get; set; }
        public int[] Marks { get; set; }
        public int[] MaxMarks { get; set; }
    }
}
