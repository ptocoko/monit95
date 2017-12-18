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

        public void GenerateByRsurTestId(int rsurTestId)
        {
            var rsurTest = context.RsurTests.Single(p => p.Id == rsurTestId);
            if(rsurTest.TestDate < new DateTime(2017, 10, 11))
            {
                throw new ArgumentException("RsurTest is not allowed");
            }

            var participTestIds = context.RsurTestResults.Where(p => p.RsurParticipTest.RsurTestId == rsurTestId).Select(s => s.RsurParticipTestId);
            if (!participTestIds.Any())
            {
                throw new ArgumentException("не найдено ни одного результата по данному тесту");
            }

            foreach (var participTestId in participTestIds)
            {
                GenerateByParticipTestId(participTestId);
            }
        }
        
        public void GenerateByParticipTestId(int participTestId)
        {
            var entity = context.RsurTestResults.Single(p => p.RsurParticipTestId == participTestId);

            int[] marks;
            var marksString = entity.RsurQuestionValues;
            if(Regex.IsMatch(marksString, @"^([0-1];)([0-1];)*([0-1])$"))
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
                .Select(s => new RsurQuestionsModel
                {
                    TestQuestionId = s.Id,
                    QuestionId = s.Question.Id,
                    EgeOrder = s.Question.Order,
                    Mark = marks[s.Order - 1]
                })
                .GroupBy(gb => gb.QuestionId)
                .Select(s => new EgeQuestionsModel
                {
                    QuestionId = s.Key,
                    EgeValue = (int)Math.Round(s.Select(rsurQuestion => rsurQuestion.Mark).Average() * 100, MidpointRounding.AwayFromZero),
                    EgeOrder = s.First().EgeOrder
                });

            if (questionsModel.Any(x => x.EgeOrder == null))
                throw new MissingFieldException("Отсутствует поле Order в таблице Questions");

            var egeValues = questionsModel.Select(s => s.EgeValue);
            var grade5 = GetGrade5(egeValues);

            var egeQuestionValues = GetEgeQuestionValues(questionsModel);
        }

        private int GetGrade5(IEnumerable<int> egeValues)
        {
            int allValuesCount = egeValues.Count();
            int badCount = egeValues.Count(p => p < 60); //Количество EgeQuestionValues со значение меньше 60
            int midCount = egeValues.Count(p => p >= 60 && p < 81);
            int goodCount = egeValues.Count(p => p > 80);

            if(badCount > 0)
            {
                return 2;
            }
            else if((1-(midCount / allValuesCount)) > 0.4)  //нужно чтобы количество EgeQuestionValues со средним значение было не больше 40% от общего числа оценок
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
