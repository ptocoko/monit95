﻿using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;

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

            report.SchoolParticipInfo = new SchoolParticip
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

            report.EgeQuestionResults = GetEgeQuestionResults(entity.RsurParticipTest.RsurTest.Test, entity.EgeQuestionValues);

            return report;

        }

        #region Private methods

        /// <summary>
        /// Создание записи для таблицы «Выполнение заданий КИМ ЕГЭ» в отчете «Карта учителя»
        /// </summary>
        /// <param name="test">Блок РСУР</param>
        /// <param name="egeQuestionValues">
        /// <example><example>{"2(40%);5(0%);8(0%)", "2(70%);5(75%);8(57%)"}</example></example>
        /// </param>
        /// <returns></returns>
        private IEnumerable<EgeQuestionResult> GetEgeQuestionResults(Test test, string egeQuestionValues)
        {
            if (test == null || test.TestQuestions.All(x => !x.RsurEgeQuestions.Any())) // only new model has RsurEgeQuestions            
                throw new ArgumentException(nameof(test));            
            
            if (string.IsNullOrWhiteSpace(egeQuestionValues))
                throw new ArgumentException($"{nameof(egeQuestionValues)} is null or empty");

            var egeQuestionValuesArray = egeQuestionValues.Split(';');
            if (!egeQuestionValuesArray.Any())
                throw new ArgumentException(nameof(egeQuestionValues));

            var egeQuestionResults = new List<EgeQuestionResult>();
            foreach (var egeQuestionValueString in egeQuestionValuesArray)
            {
                // Get egeQuestionNumber from egeQuestionValueString = "2(70%)" (e.g.) 
                var egeQuestionNumber = int.Parse(Regex.Match(egeQuestionValueString, @"\d+(?=\()").Value); // '(?=\()' - искоючить из результата открывающую скобку                

                var egeQuestionResult = new EgeQuestionResult
                {
                    EgeQuestionNumber = egeQuestionNumber,
                    Value = double.Parse(Regex.Match(egeQuestionValueString, @"\d+\.*\d*(?=%)").Value.Replace('.', ',')) // get egeQuestionValue from egeQuestionValueString = "2(70%)" (e.g.) 
                };

                // Получение заданий КИМ РСУР, которые проверяют задание КИМ ЕГЭ (egeQuestionNumber) 
                var testQuestions = test.TestQuestions.Where(tq => tq.RsurEgeQuestions.Any(req => req.EgeQuestionOrder == egeQuestionNumber)).ToList();

                egeQuestionResult.RsurQuestionNumbers = testQuestions.Select(tq => tq.Name).Aggregate((s1, s2) => $"{s1};{s2}");
                egeQuestionResult.ElementNames = testQuestions.First().Question.ElementNames;

                egeQuestionResults.Add(egeQuestionResult);
            }

            return egeQuestionResults;
        }

        private IEnumerable<ParticipReport> GetResults(IQueryable<RsurTestResult> queryable, DateTime testDate)
        {
            var notShowedTestIds = new int[] { };
            DateTime maxDateTime = new DateTime(2017, 12, 1);

            return queryable.Where(p => p.RsurParticipTest.RsurTest.TestDate >= testDate && p.RsurParticipTest.RsurTest.TestDate < maxDateTime
                                     && p.RsurParticipTest.RsurParticip.ActualCode == 1
                                     && p.RsurQuestionValues.IndexOf("X") == -1
                                     && !notShowedTestIds.Contains(p.RsurParticipTest.RsurTestId))
                        .Include(s => s.RsurParticipTest.RsurParticip).Include(s => s.RsurParticipTest.RsurParticip.School).ToList()
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
                            },
                            RsurParticipTestId = s.RsurParticipTestId
                        })
                        .OrderBy(tb => tb.SchoolParticipInfo.SchoolName).ThenBy(ob => ob.IsPassTest).ThenBy(tb => tb.SchoolParticipInfo.Surname).ThenBy(tb => tb.SchoolParticipInfo.Name);
        }

        #endregion

        public IEnumerable<ParticipReport> GetResultsForArea(int areaCode, DateTime testDate)
        {
            var results = context.RsurTestResults.Where(p => p.RsurParticipTest.RsurParticip.School.AreaCode == areaCode);
            return GetResults(results, testDate);
        }

        public IEnumerable<ParticipReport> GetResultsForSchool(string schoolId, DateTime testDate)
        {
            var results = context.RsurTestResults.Where(p => p.RsurParticipTest.RsurParticip.SchoolId == schoolId);
            return GetResults(results, testDate);
        }

        public IEnumerable<ParticipReport> GetResultsForParticip(int rsurParticipCode, DateTime testDate)
        {
            var results = context.RsurTestResults.Where(p => p.RsurParticipTest.RsurParticipCode == rsurParticipCode);
            return GetResults(results, testDate);
        }

    }
}
