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

        public void EditQuestionMarks(int participTestId, string schoolId, IEnumerable<QuestionMarkDto> questionMarks)
        {
            CheckPostedQuestionMarks(questionMarks);

            var participTest = context.ParticipTests.SingleOrDefault(p => p.Id == participTestId && p.Particip.SchoolId == schoolId);
            if (participTest == null)
                throw new ArgumentException("ParticipTest with this Id not exist");

            if (participTest.OneTwoThreeQuestionMarks.Any())
            {
                context.OneTwoThreeQuestionMarks.RemoveRange(participTest.OneTwoThreeQuestionMarks);
            }

            participTest.Grade5 = null;

            context.OneTwoThreeQuestionMarks.AddRange(questionMarks.Select(s => new OneTwoThreeQuestionMark
            {
                ParticipTestId = participTestId,
                AwardedMark = s.CurrentMark.Value,
                OneTwoThreeQuestionId = s.QuestionId
            }));

            context.SaveChanges();
        }

        public QuestionProtocolDto GetProtocol(int participTestId, string schoolId)
        {
            var participTest = context.ParticipTests.SingleOrDefault(p => p.Id == participTestId && p.Particip.SchoolId == schoolId);
            if (participTest == null)
                throw new ArgumentException("ParticipTest with this Id not exist");

            return new QuestionProtocolDto
            {
                ParticipFIO = $"{participTest.Particip.Surname} {participTest.Particip.Name} {participTest.Particip.SecondName}",
                QuestionMarks = participTest.ProjectTest.Test.OneTwoThreeQuestions.Select(s => new QuestionMarkDto
                {
                    QuestionId = s.Id,
                    MaxMark = s.MaxMark,
                    CurrentMark = s.OneTwoThreeQuestionMarks.FirstOrDefault()?.AwardedMark,
                    Name = s.Name
                })
            };
        }

        public IEnumerable<QuestionListDto> GetQuestionListDtos(string schoolId, int projectTestId)
        {
            var participTests = context.ParticipTests.AsNoTracking().Where(p => p.Particip.SchoolId == schoolId && p.ProjectTest.ProjectId == _projectId && p.ProjectTestId == projectTestId);

            var questionList = new List<QuestionListDto>();
            foreach (var participTest in participTests)
            {
                questionList.Add(new QuestionListDto
                {
                    ParticipTestId = participTest.Id,
                    ParticipId = participTest.ParticipId,
                    ParticipFIO = participTest.Particip.Surname + " " + participTest.Particip.Name + " " + participTest.Particip.SecondName,
                    ClassId = participTest.Particip.ClassId,
                    ClassName = participTest.Particip.Class.Name.Trim(),
                    Marks = GetMarks(participTest)
                });
            }

            return questionList;
        }

        public void MarkAsAbsent(int participTestId, string schoolId)
        {
            var participTest = context.ParticipTests.SingleOrDefault(p => p.Id == participTestId && p.Particip.SchoolId == schoolId);
            if (participTest == null)
                throw new ArgumentException("ParticipTest with this Id not exist");

            if (participTest.OneTwoThreeQuestionMarks.Any())
            {
                context.OneTwoThreeQuestionMarks.RemoveRange(participTest.OneTwoThreeQuestionMarks);
            }

            participTest.Grade5 = -1;

            context.SaveChanges();
        }

        private void CheckPostedQuestionMarks(IEnumerable<QuestionMarkDto> questionMarks)
        {
            if(questionMarks.Any(p => p.CurrentMark == null))
            {
                throw new ArgumentException("Posted CurrentMarks cannot be null");
            }

            if(questionMarks.Any(p => p.CurrentMark > p.MaxMark))
            {
                throw new ArgumentException("CurrentMarks should be less or equal to MaxMark");
            }

            if(questionMarks.Any(p => p.CurrentMark < 0))
            {
                throw new ArgumentException("CurrentMarks should be more than 0");
            }
        }

        private string GetMarks(ParticipTest participTest)
        {
            if(participTest.Grade5 == -1)
            {
                return "отсутствовал";
            }
            else if (!participTest.OneTwoThreeQuestionMarks.Any())
            {
                return null;
            }
            else
            {
                return participTest.OneTwoThreeQuestionMarks.AsEnumerable().Select(s => s.AwardedMark.ToString()).Aggregate((s1, s2) => $"{s1};{s2}");
            }
        }
    }
}
