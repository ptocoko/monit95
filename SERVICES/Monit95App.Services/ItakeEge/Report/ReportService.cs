﻿using Monit95App.Domain.Core.Abstract;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using ServiceResult;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.ItakeEge.Report
{
    public class ReportService
    {
        private readonly CokoContext context;

        public ReportService(CokoContext context)
        {
            this.context = context;
        }

        public ServiceResult<ReportDto> GetReport(int participTestId)
        {
            var result = new ServiceResult<ReportDto>();

            var entity = context.ParticipTests
                .Include("Particip.School")
                .Include("QuestionMarks")
                .Include("ProjectTest.Test.RsurQuestions.EgeQuestion")
                .SingleOrDefault(p => p.Id == participTestId && p.Grade5.HasValue && p.Grade5 > 0);
            if(entity == null)
            {
                result.HasError = true;
                result.Errors.Add(new ServiceError
                {
                    HttpCode = 404,
                    Description = $"результат с таким {participTestId} не найден"
                });
                return result;
            }

            result.Result = new ReportDto
            {
                Surname = entity.Particip.Surname,
                Name = entity.Particip.Name,
                SecondName = entity.Particip.SecondName,
                SchoolName = entity.Particip.School.Name.Trim(),
                ParticipTestId = entity.Id,
                TestDateString = entity.ProjectTest.TestDate.ToString("dd.MM.yyyy"),
                TestName = entity.ProjectTest.Test.Name,
                TestStatus = entity.Grade5 == 2 ? "НЕЗАЧЕТ" : "ЗАЧЕТ",
                ProjectTestId = entity.ProjectTestId,
                PrimaryMark = (int)entity.PrimaryMark,
                Marks = entity.QuestionMarks.Select(s => (int)s.AwardedMark),
                ElementsResults = GetElementResults(entity)
            };

            return result;
        }

        private IEnumerable<ElementResultDto> GetElementResults(ParticipTest entity)
        {
            var questions = entity.ProjectTest.Test.Questions;
            var egeQuestionIds = questions.Select(q => q.EgeQuestionId);
            var elementResults = new List<ElementResultDto>();

            foreach(var egeQuestionId in egeQuestionIds)
            {
                var egeQuestion = questions.First(q => q.EgeQuestionId == egeQuestionId).EgeQuestion;
                var egeQuestonMarks = entity.QuestionMarks.Where(qm => qm.Question.EgeQuestionId == egeQuestionId);

                elementResults.Add(new ElementResultDto
                {
                    ElementNumber = egeQuestion.Order,
                    QuestionNumbers = questions.Where(q => q.EgeQuestionId == egeQuestionId).Select(q => q.Order),
                    Name = egeQuestion.ElementNames,
                    Value = Math.Round(egeQuestonMarks.Select(qm => qm.AwardedMark).Sum() * 100.0 / egeQuestonMarks.Select(qm => qm.Question.MaxMark).Sum(), MidpointRounding.AwayFromZero)
                });
            }

            return elementResults;
        }
    }
}
