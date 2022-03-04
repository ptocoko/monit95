using Monit95App.Domain.Core.Entities;
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

            if (testResultEntity.RsurParticipTest.RsurTestId == 3180)
            {
                marks[4] = 0;
                marks[10] = 0;
            }

            // в КИМ по географии первый блок прокралась ошибка, решено засчитать всем второе задание
            if (testResultEntity.RsurParticipTest.RsurTestId == 3208)
            {
                marks[1] = 1;
            }

            var testId = testResultEntity.RsurParticipTest.RsurTest.TestId;

            // перепутал спецификации для алгебры: до того как исправил нескольким занесли по неправильной спецификации
            if (testId.ToString().ToUpper() == "92D1766B-38AF-459A-9EE5-5441830135D9" && marks.Length == 21)
            {
                testId = new Guid("84DC8187-77E4-41EA-A2E8-CFC1FFD50724");
            }

            var rsurQuestionsModel = context.RsurQuestions
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
                });

            var egeQuestionsModel = rsurQuestionsModel
                .GroupBy(gb => gb.QuestionId)
                .Select(s => new EgeQuestionsModel
                {
                    QuestionId = s.Key,
                    EgeValue = (int)Math.Round(s.Select(rsurQuestion => rsurQuestion.Mark).Sum() * 100.0 / s.Select(rsurQuestion => rsurQuestion.MaxMark).Sum(), MidpointRounding.AwayFromZero),
                    EgeOrder = s.First().EgeOrder,
                    RsurQuestionsCount = s.Count()
                });

            if (egeQuestionsModel.Any(x => x.EgeOrder == null))
                throw new ArgumentException("Отсутствует поле Order в таблице Questions");
            
            IEnumerable<EgeValueModel> egeValues;
            // в КИМ по географии в задания 15 и 16, которые соответствуют заданию 26 с КИМ ЕГЭ, прокралась ошибочка, пытаемся исправиться
            // еще и в заданиях 17 и 18 такая же фигня
            if (testResultEntity.RsurParticipTest.RsurTestId == 2153)
            {
                egeValues = GetEgeValuesForGeo(egeQuestionsModel);
            }
            else if(testResultEntity.RsurParticipTest.RsurTestId == 3184)
            {
                egeValues = GetEgeValuesForGeo2(egeQuestionsModel);
            }
            else
            {
                egeValues = egeQuestionsModel.Select(MapToEgeValuesModel);
            }
            
            int grade5;
            int? grade100 = null;
            // География. Комплексная
            //if(testResultEntity.RsurParticipTest.RsurTestId == 2138)
            //{
            //    grade5 = GetGrade5ForGeo(egeValues);
            //}
            //// Общество. Комплексная
            //else if (testResultEntity.RsurParticipTest.RsurTestId == 2139)
            //{
            //    grade5 = marks.Sum() >= 28 ? 5 : 2;
            //}
            //else if (testResultEntity.RsurParticipTest.RsurTestId == 3216)
            //{
            //    grade5 = marks.Sum() >= 25 ? 5 : 2;
            //}
            //// Физика 2 блок "Законы сохранения в механике"
            //else if (testResultEntity.RsurParticipTest.RsurTestId == 3176)
            //{
            //    grade5 = marks.Sum() >= 25 ? 5 : 2;
            //}
            //// Физика 1 блок "Кинематика. Динамика"
            //else if (testResultEntity.RsurParticipTest.RsurTestId == 3237)
            //{
            //    grade5 = marks.Sum() >= 25 ? 5 : 2;
            //}
            //// Общество 1 блок "Человек и общество"
            //else if (testResultEntity.RsurParticipTest.RsurTestId == 3238)
            //{
            //    grade5 = marks.Sum() >= 23 ? 5 : 2;
            //}
            if (new int[] { 5278, 5279, 5280, 5281, 5282 }.Contains(testResultEntity.RsurParticipTest.RsurTestId))
            {
                grade100 = egeQuestionsModel.Count(s => s.EgeValue >= 50) * 100 / egeQuestionsModel.Count();
                grade5 = grade100 >= 70 ? 5 : 2;
            }
            else if (testResultEntity.RsurParticipTest.RsurTest.Test.NumberCode == "1201")
            {
                grade5 = marks.Sum() >= 25 ? 5 : 2;
            }
            else if (testResultEntity.RsurParticipTest.RsurTest.Test.NumberCode == "1202")
            {
                grade5 = marks.Sum() >= 22 ? 5 : 2;
            }
            else if (testResultEntity.RsurParticipTest.RsurTest.Test.NumberCode == "1203")
            {
                grade5 = marks.Sum() >= 22 ? 5 : 2;
            }
            else if (testResultEntity.RsurParticipTest.RsurTest.Test.NumberCode == "1204")
            {
                grade5 = marks.Sum() >= 21 ? 5 : 2;
            }
            else if (testResultEntity.RsurParticipTest.RsurTest.Test.NumberCode == "1205")
            {
                grade5 = marks.Sum() >= 24 ? 5 : 2;
            }
            else if (testResultEntity.RsurParticipTest.RsurTest.Test.NumberCode.StartsWith("03"))
            {
                grade5 = marks.Sum() >= 25 ? 5 : 2;
            }
            else
            {
                grade5 = GetGrade5(egeValues);
            }

            var egeQuestionValues = GetEgeQuestionValues(egeQuestionsModel);

            context.RsurElementResults.RemoveRange(context.RsurElementResults.Where(p => p.RsurParticipTestId == participTestId));

            context.RsurElementResults.AddRange(egeQuestionsModel.Select(s => new RsurElementResult
            {
                RsurParticipTestId = participTestId,
                ElementOrder = (int)s.EgeOrder,
                Value = s.EgeValue,
                ElementId = s.QuestionId
            }));

            testResultEntity.Grade100 = grade100;
            testResultEntity.Grade5 = grade5;
            testResultEntity.PrimaryMark = marks.Sum();
            testResultEntity.EgeQuestionValues = egeQuestionValues;
            context.SaveChanges();

            return (grade5, egeQuestionValues);
        }

        private int GetGrade5ForTestsWithTwoQuestionsForOne(IEnumerable<EgeValueModel> egeValues)
        {
            int allValuesCount = egeValues.Count();
            int badCount = egeValues.Count(p => p.EgeValue < 50); //Количество EgeQuestionValues со значение меньше 50
            int midCount = egeValues.Count(p => p.EgeValue >= 50 && p.EgeValue < 80);
            int goodCount = egeValues.Count(p => p.EgeValue >= 80);

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

        private IEnumerable<EgeValueModel> GetEgeValuesForGeo(IEnumerable<EgeQuestionsModel> questionsModel)
        {
            var ordersWhereValueUnder100 = questionsModel.Where(p => p.EgeValue < 100 && p.EgeOrder >= 26).Select(s => s.EgeOrder);

            return questionsModel.Where(p => !ordersWhereValueUnder100.Contains(p.EgeOrder))
                .Select(MapToEgeValuesModel);
        }

        private IEnumerable<EgeValueModel> GetEgeValuesForGeo2(IEnumerable<EgeQuestionsModel> questionsModel)
        {
            var ordersWhereValueUnder100 = questionsModel.Where(p => p.EgeValue < 100 && p.EgeOrder == 17).Select(s => s.EgeOrder);

            return questionsModel.Where(p => !ordersWhereValueUnder100.Contains(p.EgeOrder)).Select(MapToEgeValuesModel);
        }

        private int GetGrade5(IEnumerable<EgeValueModel> egeValues)
        {
            int allValuesCount = egeValues.Count();

            int badCount = egeValues.Count(p => p.EgeValue < GetMidPercent(p.RsurValuesCount));
            int midCount = egeValues.Count(p => p.EgeValue >= GetMidPercent(p.RsurValuesCount) && p.EgeValue < 81);
            int goodCount = egeValues.Count(p => p.EgeValue > 80);

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

        private int GetMidPercent(int RsurValuesCount)
        {
            return RsurValuesCount <= 2 ? 50 : 60;
        }

        private int GetGrade5ForGeo(IEnumerable<EgeValueModel> egeValues)
        {
            int badCount = egeValues.Count(p => p.EgeValue == 0);
            int allCount = egeValues.Count();

            return allCount - badCount >= 21 ? 5 : 2;
        }
        
        private Func<EgeQuestionsModel, EgeValueModel> MapToEgeValuesModel = s => new EgeValueModel
        {
            EgeValue = s.EgeValue,
            RsurValuesCount = s.RsurQuestionsCount
        };

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
        public int RsurQuestionsCount { get; set; }
    }

    class EgeValueModel
    {
        public int EgeValue { get; set; }
        public int RsurValuesCount { get; set; }
    }
}
