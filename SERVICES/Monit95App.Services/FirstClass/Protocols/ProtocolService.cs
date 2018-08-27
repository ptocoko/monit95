using Monit95App.Infrastructure.Data;
using Monit95App.Services.FirstClass.Dtos;
using ServiceResult.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Protocols
{
    public class ProtocolService
    {
        private readonly CokoContext context;

        public ProtocolService(CokoContext context)
        {
            this.context = context;
        }

        public IEnumerable<ProtocolGetDto> GetProtocols(string schoolId, int projectId)
        {
            return context.ParticipTests
                .AsNoTracking()
                .Where(p => p.ProjectTest.ProjectId == projectId && p.Particip.SchoolId == schoolId)
                .OrderBy(ob => ob.Particip.ClassId).ThenBy(tb => tb.Particip.Surname).ThenBy(tb => tb.Particip.Name)
                .Select(s => new ProtocolGetDto
                {
                    Surname = s.Particip.Surname,
                    Name = s.Particip.Name,
                    SecondName = s.Particip.SecondName,
                    Marks = s.Result.Marks,
                    ClassName = s.Particip.Class.Name.Trim()
                });
        }

        public ProtocolPostDto GetEditProtocol(int participTestId)
        {
            var entity = context.ParticipTests.Find(participTestId);
            if (entity == null)
            {
                throw new EntityNotFoundOrAccessException();
            }

            var editDto = new ProtocolPostDto
            {
                Surname = entity.Particip.Surname,
                Name = entity.Particip.Name,
                SecondName = entity.Particip.SecondName,
                ParticipTestId = entity.Id,
                QuestionResultsCollection = ResultData.Select(s => new QuestionResultDto { Name = s.Name, Step = s.Step, MaxMark = s.MaxMark }).ToArray()
            };

            if (entity.Result != null || entity.Result.Marks != null)
            {
                var marksArr = entity.Result.Marks.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries).Select(s => double.Parse(s.Trim())).ToArray();
                if (marksArr.Length != editDto.QuestionResultsCollection.Count)
                {
                    throw new MarksParseException();
                }

                for (int i = 0; i <= marksArr.Length; i++)
                {
                    if (editDto.QuestionResultsCollection[i].MaxMark < marksArr[i])
                    {
                        throw new MarksParseException();
                    }

                    editDto.QuestionResultsCollection[i].CurrentMark = marksArr[i];
                }
            }

            return editDto;
        }



        private readonly IEnumerable<FirstClassResultModel> ResultData = new List<FirstClassResultModel>
        {
            new FirstClassResultModel
            {
                Name = "Графические ряды",
                Step = 0.5,
                MaxMark = 4
            },
            new FirstClassResultModel
            {
                Name = "Узор из точек",
                Step = 0.5,
                MaxMark = 1
            },
            new FirstClassResultModel
            {
                Name = "Рисунок",
                Step = 0.5,
                MaxMark = 3
            },
            new FirstClassResultModel
            {
                Name = "Дорожка звуков",
                Step = 0.5,
                MaxMark = 1
            },
            new FirstClassResultModel
            {
                Name = "Моторика",
                Step = 0.5,
                MaxMark = 4
            },
        };
    }

    public class FirstClassResultModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Step { get; set; }
        public int MaxMark { get; set; }
    }
}
