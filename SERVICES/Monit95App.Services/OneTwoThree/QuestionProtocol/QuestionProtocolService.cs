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

        public void EditQuestionMarks(IEnumerable<QuestionMarkDto> questionMarks)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<QuestionProtocolDto> GetProtocol(int participTestId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<QuestionListDto> GetQuestionListDtos(string schoolId)
        {
            var participTests = context.ParticipTests.Where(p => p.Particip.SchoolId == schoolId && p.ProjectTest.ProjectId == _projectId && p.ProjectTest.IsOpen);

            var questionList = new List<QuestionListDto>();
            foreach (var participTest in participTests)
            {
                questionList.Add(new QuestionListDto
                {
                    ParticipTestId = participTest.Id,
                    ParticipId = participTest.ParticipId,
                    ClassName = participTest.Particip.Class.Name.Trim(),
                    Marks = participTest.OneTwoThreeQuestionMarks.Select(s => s.AwardedMark.ToString()).Aggregate((source, dest) => $"{source};{dest}")
                });
            }

            return questionList;
        }
    }
}
