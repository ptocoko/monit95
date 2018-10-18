using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace Monit95App.Services.Rsur.MarksConvert
{
    public class RsurMarksConverter : IRsurMarksConverter
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        #region Constructors

        public RsurMarksConverter(CokoContext _context)
        {
            context = _context;
        }

        #endregion

        public void GenerateByRsurTestIds(int[] rsurTestIds)
        {
            foreach (var rsurTestId in rsurTestIds)
            {
                GenerateByRsurTestId(rsurTestId);
            }
        }

        public void GenerateByRsurTestId(int rsurTestId)
        {
            var rsurTest = context.RsurTests.Single(p => p.Id == rsurTestId);
            if(rsurTest.TestDate < new DateTime(2017, 12, 1))
            {
                throw new ArgumentException("RsurTest is not allowed");
            }

            var participTestIds = context.RsurTestResults
                .Where(p => p.RsurParticipTest.RsurTestId == rsurTestId 
                         && p.RsurParticipTest.RsurParticip.SchoolId != "0000"
                         && p.RsurQuestionValues != "wasnot" 
                         && p.RsurQuestionValues != null)
                .Select(s => s.RsurParticipTestId)
                .ToList();

            if (!participTestIds.Any())
            {
                throw new ArgumentException("не найдено ни одного результата по данному тесту");
            }

            foreach (var participTestId in participTestIds)
            {
                GenerateAndSaveByParticipTestId(participTestId);
            }
        }

        public void GenerateAndSaveByParticipTestIds(IEnumerable<int> participTestIds)
        {
            foreach (int participTestId in participTestIds)
            {
                GenerateAndSaveByParticipTestId(participTestId);
            }
        }

        /// <summary>
        /// Вычисление EgeQuestionValues и Grade5
        /// </summary>
        /// <remarks>
        /// Вычисляет RsurTestResult.EgeQuestionValues и RsurTestResult.Grade5 для указанного RsurParticipTestId.
        /// Вычисление производятся как для открытых RsurTest так и для закрытых
        /// </remarks>
        /// <param name="participTestId">Он же RsurParticipTest.RsurParticipTestId</param>
        /// <returns></returns>
        public (int grade5, string egeQuestionValues) GenerateAndSaveByParticipTestId(int participTestId)
        {            
            var testResultEntity = context.RsurTestResults.Find(participTestId);
            _ = testResultEntity ?? throw new ArgumentException("В базе несуществует записи с таким Id", nameof(participTestId));

            // Переводим строку, содержащую баллы по заданиям в массив: "1;0;1;0;1" -> [1,0,1,0,1]
            int[] marks;
            var marksString = testResultEntity.RsurQuestionValues;
            if (marksString != "wasnot")
            {
                marks = marksString
                    .Split(';')
                    .Select(int.Parse)
                    .ToArray();
            }
            else
            {
                throw new ArgumentException("Нет баллов по заданиям для указанной записи", nameof(participTestId));
            }

            var testId = testResultEntity.RsurParticipTest.RsurTest.TestId;

            var questionsModel = context.RsurQuestions
                .Where(testQuestion => testQuestion.TestId == testId)
                .Include(x => x.EgeQuestion)
                .ToList()
                .Select(testQuestion => new RsurQuestionsModel
                {
                    TestQuestionId = testQuestion.Id,
                    QuestionId = testQuestion.EgeQuestion.Id,
                    EgeOrder = testQuestion.EgeQuestion.Order,
                    MaxMark = testQuestion.MaxMark,
                    Mark = marks[testQuestion.Order - 1]
                })
                .GroupBy(gb => gb.QuestionId)
                .Select(s => new EgeQuestionsModel
                {
                    QuestionId = s.Key,
                    EgeValue = (int)Math.Round((s.Select(rsurQuestion => rsurQuestion.Mark).Average() * 100) / s.First().MaxMark, MidpointRounding.AwayFromZero),
                    EgeOrder = s.First().EgeOrder
                });

            if (questionsModel.Any(x => x.EgeOrder == null))
                throw new ArgumentException("Отсутствует поле Order в таблице Questions");

            var egeValues = questionsModel.Select(s => s.EgeValue);

            int grade5;
            if(testResultEntity.RsurParticipTest.RsurTestId == 2138)
            {
                grade5 = GetGrade5ForGeo(egeValues);
            }
            else if (testResultEntity.RsurParticipTest.RsurTestId == 2139)
            {
                grade5 = marks.Sum() >= 28 ? 5 : 2;
            }
            else if (testResultEntity.RsurParticipTest.RsurTest.Test.NumberCode == "0104")
            {
                grade5 = GetGrade5ForRus4(egeValues);
            }
            else
            {
                grade5 = GetGrade5(egeValues);
            }

            var egeQuestionValues = GetEgeQuestionValues(questionsModel);

            testResultEntity.Grade5 = grade5;
            testResultEntity.PrimaryMark = marks.Sum();
            testResultEntity.EgeQuestionValues = egeQuestionValues;
            context.SaveChanges();

            return (grade5, egeQuestionValues);
        }

        private int GetGrade5ForRus4(IEnumerable<int> egeValues)
        {
            int allValuesCount = egeValues.Count();
            int badCount = egeValues.Count(p => p < 50); //Количество EgeQuestionValues со значение меньше 60
            int midCount = egeValues.Count(p => p >= 50 && p < 81);
            int goodCount = egeValues.Count(p => p > 80);

            int percentOfGoodValues = (int)Math.Round(goodCount / (allValuesCount / 100M), MidpointRounding.AwayFromZero);

            if (badCount > 0)
            {
                return 2;
            }
            else if (percentOfGoodValues < 51)  //нужно чтобы количество EgeQuestionValues со средним значение было не больше 40% от общего числа оценок
            {
                return 2;
            }
            else
            {
                return 5;
            }
        }

        private int GetGrade5(IEnumerable<int> egeValues)
        {
            int allValuesCount = egeValues.Count();
            int badCount = egeValues.Count(p => p < 60); //Количество EgeQuestionValues со значение меньше 60
            int midCount = egeValues.Count(p => p >= 60 && p < 81);
            int goodCount = egeValues.Count(p => p > 80);

            int percentOfGoodValues = (int)Math.Round(goodCount / (allValuesCount / 100M), MidpointRounding.AwayFromZero);

            if(badCount > 0)
            {
                return 2;
            }
            else if(percentOfGoodValues < 51)  //нужно чтобы количество EgeQuestionValues со средним значение было не больше 40% от общего числа оценок
            {
                return 2;
            }
            else
            {
                return 5;
            }
        }

        private int GetGrade5ForGeo(IEnumerable<int> egeValues)
        {
            int badCount = egeValues.Count(p => p == 0);
            int allCount = egeValues.Count();

            return allCount - badCount >= 21 ? 5 : 2;
        }

        private string GetEgeQuestionValues(IEnumerable<EgeQuestionsModel> questionsModel)
        {
            StringBuilder sb = new StringBuilder();
            foreach (var model in questionsModel)
            {
                sb.Append($"{model.EgeOrder}({model.EgeValue}%);");
            }
            var egeQuestionValues = sb.ToString();

            return egeQuestionValues.Substring(0, egeQuestionValues.Length - 1); //избавляемся от последнего символа точки с запятой
        }

    }

    class RsurQuestionsModel
    {
        public int TestQuestionId { get; set; }
        public int QuestionId { get; set; }
        public int? EgeOrder { get; set; }
        public int Mark { get; set; }
        public int MaxMark { get; set; }
    }

    class EgeQuestionsModel
    {
        public int QuestionId { get; set; }
        public int EgeValue { get; set; }
        public int? EgeOrder { get; set; }
    }
}
