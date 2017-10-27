using Monit95App.Infrastructure.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ParticipReportService : IParticipReportService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public ParticipReportService(CokoContext context)
        {
            this.context = context;
        }

        public ParticipExtendReport GetReport(int rsurParticipTestId)
        {
            var report = new ParticipExtendReport();

            var entity = context.RsurTestResults.Find(rsurParticipTestId);
            _ = entity ?? throw new ArgumentNullException(nameof(rsurParticipTestId));

            report.SchoolParticipInfo = new Domain.Core.SchoolParticip
            {
                Surname = entity.RsurParticipTest.RsurParticip.Surname,
                Name = entity.RsurParticipTest.RsurParticip.Name,
                SecondName = entity.RsurParticipTest.RsurParticip.SecondName,
                SchoolName = entity.RsurParticipTest.RsurParticip.School.Name
            };
            
            report.Code = entity.RsurParticipTest.RsurParticipCode;
            report.IsPassTest = entity.Grade5 == 5 ? "зачет" : "незачет";
            report.TestDate = entity.RsurParticipTest.RsurTest.TestDate;
            report.TestName = $"{entity.RsurParticipTest.RsurTest.Test.NumberCode}" +
                              $" - {entity.RsurParticipTest.RsurTest.Test.Name}";
            report.TestNameWithDate = $"{report.TestName}, {report.TestDate.ToShortDateString()}";


            var matches = Regex.Matches(entity.EgeQuestionValues, @"\([\d,]*%\)"); //с помощью регулярного выражения (https://regex101.com/r/og9F0q/2) 
            List<int> egeQuestionValuesArray = new List<int>();               //выдергиваем все значения между скобок
            foreach (Match match in matches)                                  //избавляемся от скобок и знака процента, оставляя только числа
            {                                                                 //переводим все значения в int
                var groups = match.Groups;
                egeQuestionValuesArray.Add((int)double.Parse(groups[0].Value.Substring(1, groups[0].Value.Length - 3).Replace(",", ".")));
            }

            var testId = entity.RsurParticipTest.RsurTest.TestId;
            report.EgeQuestionResults = GetEgeQuestionResults(testId, egeQuestionValuesArray.ToArray());

            return report;

        }

        public IEnumerable<EgeQuestionResult> GetEgeQuestionResults(Guid testId, int[] egeQuestionValuesArray)
        {
            var res = context.TestQuestions.Where(p => p.TestId == testId).GroupBy(gp => gp.QuestionId).ToList();

            List<EgeQuestionResult> results = new List<EgeQuestionResult>();
            for (int i = 0; i < res.Count(); i++)
            {
                results.Add(new EgeQuestionResult
                {
                    EgeQuestionNumber = i + 1, //TODO: FIX!!
                    RsurQuestionNumbers = res[i].Select(s => s.Name).Aggregate((s1, s2) => $"{s1};{s2}"),
                    ElementNames = res[i].First().Question.ElementNames,
                    Value = egeQuestionValuesArray[i]
                });
            }

            return results;
        }

        public IEnumerable<ParticipReport> GetResultsByTestDate(int areaCode, DateTime testDate)
        {
            var results = context.RsurTestResults.Where(p => p.RsurParticipTest.RsurParticip.School.AreaCode == areaCode
                                                          && p.RsurParticipTest.RsurTest.TestDate >= testDate
                                                          && p.RsurQuestionValues.IndexOf("X") == -1).Include(s => s.RsurParticipTest.RsurParticip).Include(s => s.RsurParticipTest.RsurParticip.School).ToList()
                        .Select(s => new ParticipReport
                        {
                            Code = s.RsurParticipTest.RsurParticip.Code,
                            IsPassTest = s.Grade5 == 2 ? "незачет" : "зачет",
                            TestNameWithDate = s.RsurParticipTest.RsurTest.Test.Name + ", " + s.RsurParticipTest.RsurTest.TestDate.ToShortDateString(),
                            SchoolParticipInfo = new Domain.Core.SchoolParticip
                            {
                                Surname = s.RsurParticipTest.RsurParticip.Surname,
                                Name = s.RsurParticipTest.RsurParticip.Name,
                                SecondName = s.RsurParticipTest.RsurParticip.SecondName,
                                SchoolName = s.RsurParticipTest.RsurParticip.School.Id + " — " + s.RsurParticipTest.RsurParticip.School.Name.Trim()
                            }
                        });

            return results.OrderBy(tb => tb.SchoolParticipInfo.SchoolName).ThenBy(ob => ob.IsPassTest).ThenBy(tb => tb.SchoolParticipInfo.Surname).ThenBy(tb => tb.SchoolParticipInfo.Name);
        }
    }
}
