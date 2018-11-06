using ClosedXML.Excel;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ProtocolGenerator
{
    public class RsurStatsAndReports
    {
        private readonly CokoContext context;

        public RsurStatsAndReports(CokoContext context)
        {
            this.context = context;
        }

        public void GeoLoosers()
        {
            var egeQuestions = context.EgeQuestions
                .Where(p => p.SubjectCode == 8)
                .AsEnumerable()
                .Select(s => new EgeQuestion
                {
                    Order = s.Order,
                    ElementNames = s.ElementNames.Replace("\n", "").Replace("\r", "")
                })
                .ToDictionary(eq => eq.Order);

            var entities = context.RsurParticipTests
                .Where(p => p.RsurTestId == 2153 && p.RsurTestResult.RsurQuestionValues != "wasnot")
                .Select(s => new
                {
                    s.RsurParticip.Code,
                    FIO = s.RsurParticip.Surname + " " + s.RsurParticip.Name + " " + s.RsurParticip.SecondName,
                    AreaName = s.RsurParticip.School.Area.Name.Trim(),
                    s.RsurParticip.School.AreaCode,
                    s.RsurParticip.SchoolId,
                    SchoolName = s.RsurParticip.School.Name.Trim(),
                    EgeQuestionValues = s.RsurTestResult.EgeQuestionValues.Replace("26(0%);", "")
                })
                .Where(p => p.EgeQuestionValues.Contains("(0%)"))
                .OrderBy(ob => ob.AreaCode)
                .ThenBy(tb => tb.SchoolId)
                .ThenBy(tb => tb.FIO);

            using (var excel = new XLWorkbook(@"D:\Work\geo_stat.xlsx"))
            {
                using(var sheet = excel.Worksheets.First())
                {
                    int i = 2;
                    foreach (var result in entities)
                    {
                        var failedElementNames = new List<string>();
                        var egeQuestionNumbers = Regex.Matches(result.EgeQuestionValues, @"(\d{1,2})\(0%\)");
                        foreach(var match in egeQuestionNumbers)
                        {
                            var questionNumber = int.Parse(match.ToString().Replace("(0%)", ""));
                            failedElementNames.Add(questionNumber + ". " + egeQuestions[questionNumber].ElementNames);
                        }

                        sheet.Cell(i, 1).Value = i - 1;
                        sheet.Cell(i, 2).Value = result.Code;
                        sheet.Cell(i, 3).Value = result.FIO;
                        sheet.Cell(i, 4).Value = result.SchoolName;
                        sheet.Cell(i, 5).Value = result.AreaName;
                        sheet.Cell(i, 6).Value = failedElementNames.Aggregate((s1, s2) => $"{s1};\n{s2}");

                        i++;
                    }
                    sheet.RangeUsed(false).Style.Border.SetInsideBorder(XLBorderStyleValues.Thin);
                    sheet.RangeUsed(false).Style.Border.SetOutsideBorder(XLBorderStyleValues.Thin);
                }
                excel.Save();
            }
        }
    }
}
