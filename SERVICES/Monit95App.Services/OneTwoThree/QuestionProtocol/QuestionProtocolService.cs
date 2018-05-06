using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.QuestionProtocol
{
    public class QuestionProtocolService : IQuestionProtocolService
    {
        private readonly CokoContext context;
        private readonly int _projectId = 14;

        public QuestionProtocolService(CokoContext context)
        {
            this.context = context;
        }

        public void EditQuestionMarks(int participTestId, IEnumerable<QuestionMarkDto> questionMarks)
        {
            //TODO: check input object

            var participTest = context.ParticipTests.Find(participTestId);
            if (participTest == null)
                throw new ArgumentException("ParticipTest with this Id not exist");

            if (participTest.OneTwoThreeQuestionMarks.Any())
            {
                context.OneTwoThreeQuestionMarks.RemoveRange(participTest.OneTwoThreeQuestionMarks);
            }

            context.OneTwoThreeQuestionMarks.AddRange(questionMarks.Select(s => new OneTwoThreeQuestionMark
            {
                ParticipTestId = participTestId,
                AwardedMark = s.CurrentMark.Value,
                OneTwoThreeQuestionId = s.QuestionId
            }));

            context.SaveChanges();
        }

        public QuestionProtocolDto GetProtocol(int participTestId)
        {
            var participTest = context.ParticipTests.Find(participTestId);
            if (participTest == null)
                throw new ArgumentException("ParticipTest with this Id not exist");

            return new QuestionProtocolDto
            {
                ParticipFIO = $"{participTest.Particip.Surname} {participTest.Particip.Name} {participTest.Particip.SecondName}",
                QuestionMarks = participTest.ProjectTest.Test.OneTwoThreeQuestions.Select(s => new QuestionMarkDto
                {
                    QuestionId = s.Id,
                    MaxMark = s.MaxMark,
                    CurrentMark = s.OneTwoThreeQuestionMarks.FirstOrDefault().AwardedMark,
                    Name = s.Name
                })
            };
        }

        public IEnumerable<QuestionListDto> GetQuestionListDtos(string schoolId)
        {
            var participTests = context.ParticipTests.AsNoTracking().Where(p => p.Particip.SchoolId == schoolId && p.ProjectTest.ProjectId == _projectId && p.ProjectTest.IsOpen);

            var questionList = new List<QuestionListDto>();
            foreach (var participTest in participTests)
            {
                questionList.Add(new QuestionListDto
                {
                    ParticipTestId = participTest.Id,
                    ParticipId = participTest.ParticipId,
                    ParticipFIO = participTest.Particip.Surname + " " + participTest.Particip.Name + " " + participTest.Particip.SecondName,
                    ClassName = participTest.Particip.Class.Name.Trim(),
                    Marks = participTest.OneTwoThreeQuestionMarks.Select(s => s.AwardedMark.ToString()).AsEnumerable().Aggregate((source, dest) => $"{source};{dest}")
                });
            }

            return questionList;
        }

        public void MarkAsAbsent(int participTestId)
        {
            var participTest = context.ParticipTests.Find(participTestId);
            if (participTest == null)
                throw new ArgumentException("ParticipTest with this Id not exist");

            if (participTest.OneTwoThreeQuestionMarks.Any())
            {
                context.OneTwoThreeQuestionMarks.RemoveRange(participTest.OneTwoThreeQuestionMarks);
            }

            participTest.Grade5 = -1;

            context.SaveChanges();
        }
    }
}
