using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur.MarksConvert
{
    public class RsurMarksConverter : IRsurMarksConverter
    {
        CokoContext context;

        public RsurMarksConverter(CokoContext _context)
        {
            context = _context;
        }

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
                GenerateByParticipTestId(participTestId);
            }
        }
        
        public (int grade5, string egeQuestionValues) GenerateByParticipTestId(int participTestId)
        {
            var entity = context.RsurTestResults.Single(p => p.RsurParticipTestId == participTestId);

            int[] marks;
            var marksString = entity.RsurQuestionValues;
            if(marksString != null && marksString != "wasnot")
            {
                marks = marksString
                    .Split(';')
                    .Select(s => int.Parse(s))
                    .ToArray();
            }
            else
            {
                throw new ArgumentException("RsurQuestionValues is not valid");
            }

            var testId = entity.RsurParticipTest.RsurTest.TestId;

            var questionsModel = context.TestQuestions
                .Where(p => p.TestId == testId)
                .Include(x => x.Question)
                .ToList()
                .Select(testQuestion => new RsurQuestionsModel
                {
                    TestQuestionId = testQuestion.Id,
                    QuestionId = testQuestion.Question.Id,
                    EgeOrder = testQuestion.Question.Order,
                    Mark = marks[testQuestion.Order - 1]
                })
                .GroupBy(gb => gb.QuestionId)
                .Select(s => new EgeQuestionsModel
                {
                    QuestionId = s.Key,
                    EgeValue = (int)Math.Round(s.Select(rsurQuestion => rsurQuestion.Mark).Average() * 100, MidpointRounding.AwayFromZero),
                    EgeOrder = s.First().EgeOrder
                });

            if (questionsModel.Any(x => x.EgeOrder == null))
                throw new ArgumentException("Отсутствует поле Order в таблице Questions");

            var egeValues = questionsModel.Select(s => s.EgeValue);
            var grade5 = GetGrade5(egeValues);
            var egeQuestionValues = GetEgeQuestionValues(questionsModel);

            entity.Grade5 = grade5;
            entity.EgeQuestionValues = egeQuestionValues;
            context.SaveChanges();

            return (grade5, egeQuestionValues);
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
    }

    class EgeQuestionsModel
    {
        public int QuestionId { get; set; }
        public int EgeValue { get; set; }
        public int? EgeOrder { get; set; }
    }
}
