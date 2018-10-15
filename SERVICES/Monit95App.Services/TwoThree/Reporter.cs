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

        public Reporter(CokoContext context)
        {
            this.context = context;
        }

        public void F0_ParticipsResults()
        {
            Random rand = new Random();
            var testNameDict = new Dictionary<string, string>
            {
                ["0201"] = "2 кл. русский язык",
                ["0202"] = "2 кл. математика",
                ["0204"] = "2 кл. метапредметная диагностика",
                ["0301"] = "3 кл. русский язык",
                ["0302"] = "3 кл. математика",
                ["0304"] = "3 кл. метапредметная диагностика"
            };

            var entities = context.TwoThreeResults.Where(p => p.TestCode != "0303").Select(s => new ReportDto
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
            }).GroupBy(gb => new { gb.SchoolName, gb.AreaName });

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
                                gradeStrCell.Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
                                if (res.Grade5 == 3)
                                {
                                    gradeStrCell.Style.Fill.BackgroundColor = XLColor.PersianRed;
                                }
                                else if (res.Grade5 == 4)
                                {
                                    gradeStrCell.Style.Fill.BackgroundColor = XLColor.Yellow;
                                }
                                else
                                {
                                    gradeStrCell.Style.Fill.BackgroundColor = XLColor.ForestGreen;
                                }
                                gradeStrCell.WorksheetColumn().Width = 38;

                                sheet.Cell(i + 3, marks.Length + 7).Value = res.GradeString;
                            }

                        }
                        excel.SaveAs($@"D:\Work\reports\two-three\{schoolResults.Key.AreaName}\{schoolResults.Key.SchoolName}\{testNameDict[testResults.Key]}.xlsx");
                    }
                }
            }
        }


    }
}
