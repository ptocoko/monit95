using ClosedXML.Excel;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.TwoThree
{
    public class Reporter
    {
        private readonly CokoContext context;
        public Dictionary<string, string> testNameDict = new Dictionary<string, string>
        {
            ["0201"] = "2 кл. русский язык",
            ["0202"] = "2 кл. математика",
            ["0204"] = "2 кл. метапредметная диагностика",
            ["0301"] = "3 кл. русский язык",
            ["0302"] = "3 кл. математика",
            ["0304"] = "3 кл. метапредметная диагностика"
        };
        Random rand = new Random();
        
        public Reporter(CokoContext context)
        {
            this.context = context;
        }

        public void F0_ParticipsResults()
        {

            var entities = context.TwoThreeResults.Where(p => p.TestCode != "0303").Select(MapToReportDto()).GroupBy(gb => new { gb.SchoolName, gb.AreaName });

            foreach (var schoolResults in entities)
            {
                foreach (var testResults in schoolResults.GroupBy(gb => gb.TestCode))
                {
                    using (var excel = new XLWorkbook($@"D:\Work\reports\two-three\temp_{testResults.Key}.xlsx"))
                    {
                        using (var sheet = excel.Worksheets.First())
                        {
                            for (int i = 0; i < testResults.Count(); i++)
                            {
                                var orderedResults = testResults.OrderByDescending(ob => ob.PrimaryMark);
                                var res = orderedResults.ToArray()[i];

                                sheet.Cell(i + 3, 1).Value = res.Id;
                                sheet.Cell(i + 3, 2).Value = res.Surname;
                                sheet.Cell(i + 3, 3).Value = res.Name;
                                sheet.Cell(i + 3, 4).Value = res.SecondName;
                                sheet.Cell(i + 3, 5).Value = rand.Next(1, 4);

                                var marks = res.Marks.Split(';').Select(int.Parse).ToArray();
                                for (int j = 6; j < marks.Length + 6; j++)
                                {
                                    var mark = marks[j - 6];
                                    sheet.Cell(i + 3, j).Value = mark;
                                }
                                //sheet.Cell(i + 3, 6).SetValue(marks.AsEnumerable());
                                sheet.Cell(i + 3, marks.Length + 6).Value = res.PrimaryMark;

                                var gradeStrCell = sheet.Cell(i + 3, marks.Length + 7);
                                StyleGradeCell(res.Grade5, gradeStrCell);

                                sheet.Cell(i + 3, marks.Length + 7).Value = res.GradeString;
                            }

                        }
                        excel.SaveAs($@"D:\Work\reports\two-three\{schoolResults.Key.AreaName}\{schoolResults.Key.SchoolName}\{testNameDict[testResults.Key]}.xlsx");
                    }
                }
            }
        }

        public void F0_IndividualResults()
        {
            var destFolder = @"D:\Work\reports\two-three\Ф0. Индивидуальные результаты участников";
            var tempPath = @"D:\Work\reports\two-three\Ф0. Индивидуальные результаты участников\temp.xlsx";

            foreach (var report in context.TwoThreeResults.Where(p => p.TestCode != "0303").Select(MapToReportDto()))
            {
                using (var excel = new XLWorkbook(tempPath))
                {
                    using (var sheet = excel.Worksheets.First())
                    {
                        sheet.Cell(2, 1).Value = report.Id;
                        sheet.Cell(2, 2).Value = report.Surname;
                        sheet.Cell(2, 3).Value = report.Name;
                        sheet.Cell(2, 4).Value = report.SecondName;
                        sheet.Cell(2, 5).Value = rand.Next(1, 4);
                        sheet.Cell(2, 6).Value = report.Marks;
                        sheet.Cell(2, 7).Value = report.PrimaryMark;

                        var gradeCell = sheet.Cell(2, 8);
                        gradeCell.Value = report.GradeString;
                        StyleGradeCell(report.Grade5, gradeCell);
                    }
                    excel.SaveAs($@"{destFolder}\{report.AreaName}\{report.SchoolName}\{testNameDict[report.TestCode]}\{report.Surname} {report.Name} {report.SecondName}.xlsx");
                }
            }
        }

        public void F1_IndividualResults()
        {
            var destFolder = @"";
            var tempPath = @"";

            using (var excel = new XLWorkbook(tempPath))
            {
                using(var sheet = excel.Worksheets.First())
                {

                }
            }
        }
        
        private static void StyleGradeCell(int grade5, IXLCell gradeStrCell)
        {
            gradeStrCell.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
            if (grade5 == 3)
            {
                gradeStrCell.Style.Fill.BackgroundColor = XLColor.PersianRed;
            }
            else if (grade5 == 4)
            {
                gradeStrCell.Style.Fill.BackgroundColor = XLColor.Yellow;
            }
            else
            {
                gradeStrCell.Style.Fill.BackgroundColor = XLColor.ForestGreen;
            }
            gradeStrCell.WorksheetColumn().Width = 38;
        }

        private static System.Linq.Expressions.Expression<Func<Domain.Core.Entities.TwoThreeResult, ReportDto>> MapToReportDto()
        {
            return s => new ReportDto
            {
                Id = s.Id,
                Surname = s.Surname,
                Name = s.Name,
                SecondName = s.SecondName,
                SchoolName = s.School.Name.Trim(),
                AreaName = s.School.Area.Name.Trim(),
                TestCode = s.TestCode,
                Marks = s.Marks,
                PrimaryMark = s.PrimaryMark,
                Grade5 = s.Grade5.Value,
                GradeString = s.GradeString
            };
        }

    }
}
