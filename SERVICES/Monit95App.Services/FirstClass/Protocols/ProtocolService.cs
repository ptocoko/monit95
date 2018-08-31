using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
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

        public ProtocolsList GetProtocols(string schoolId, int projectTestId, ListGetOptions options)
        {
            if (schoolId == null)
            {
                throw new ArgumentNullException($"{nameof(schoolId)} is null!");
            }

            int offset = (int)((options.Page - 1) * options.Length);
            int length = (int)options.Length;

            var entity = context.ParticipTests
                .AsNoTracking()
                .Where(p => p.ProjectTest.Id == projectTestId && p.Particip.SchoolId == schoolId);

            IEnumerable<ClassDto> classes = entity
                .Select(s => new ClassDto { Id = s.Particip.ClassId, Name = s.Particip.Class.Name })
                .GroupBy(gb => gb.Id)
                .Select(s => s.FirstOrDefault());

            entity = FilterQuery(entity, options);

            var totalCount = entity.Count();

            entity = entity.OrderBy(ob => ob.Particip.ClassId).ThenBy(tb => tb.Particip.Surname).ThenBy(tb => tb.Particip.Name);
            entity = entity.Skip(offset).Take(length);

            var participTests = entity.AsEnumerable().Select(s => new ProtocolGetDto
            {
                ParticipTestId = s.Id,
                Surname = s.Particip.Surname,
                Name = s.Particip.Name,
                SecondName = s.Particip.SecondName,
                Marks = GetMarks(s),
                ClassName = s.Particip.Class.Name.Trim(),
                ClassId = s.Particip.ClassId
            });

            return new ProtocolsList
            {
                Items = participTests,
                TotalCount = totalCount,
                Classes = classes
            };
        }

        public ProtocolPostDto GetEditProtocol(int participTestId)
        {
            var entity = context.ParticipTests.Find(participTestId);
            if (entity == null)
            {
                throw new EntityNotFoundOrAccessException("неверный ключ запроса");
            }

            var editDto = new ProtocolPostDto
            {
                Surname = entity.Particip.Surname,
                Name = entity.Particip.Name,
                SecondName = entity.Particip.SecondName,
                ParticipTestId = entity.Id,
                QuestionResultsList = ResultData.Select(s => new QuestionResultDto { Name = s.Name, Step = s.Step, MaxMark = s.MaxMark }).ToArray()
            };

            if (entity.Result != null && entity.Result.Marks != null)
            {
                var marksArr = entity.Result.Marks.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries).Select(s => double.Parse(s.Trim())).ToArray();
                if (marksArr.Length != editDto.QuestionResultsList.Count)
                {
                    throw new MarksParseException("неверный формат оценок");
                }

                for (int i = 0; i < marksArr.Length; i++)
                {
                    if (editDto.QuestionResultsList[i].MaxMark < marksArr[i])
                    {
                        throw new MarksParseException("неверный формат оценок");
                    }

                    editDto.QuestionResultsList[i].CurrentMark = marksArr[i];
                }
            }

            return editDto;
        }

        public void EditProtocol(ProtocolPostDto protocol)
        {
            var participTestEntity = context.ParticipTests.Find(protocol.ParticipTestId);

            if (participTestEntity == null)
                throw new EntityNotFoundOrAccessException("неверный ключ запроса");
            
            participTestEntity.Grade5 = GetGrade5(protocol.QuestionResultsList);
            participTestEntity.GradeString = GetGradeStr(protocol.QuestionResultsList);
            participTestEntity.PrimaryMark = GetPrimaryMark(protocol.QuestionResultsList);

            if (participTestEntity.Result == null)
            {
                var resultEntity = new Result
                {
                    ParticipTestId = protocol.ParticipTestId,
                    Marks = protocol.QuestionResultsList.Select(s => s.CurrentMark.ToString()).Aggregate((s1, s2) => $"{s1};{s2}")
                };
                context.Results.Add(resultEntity);
            }
            else
            {
                participTestEntity.Result.Marks = protocol.QuestionResultsList.Select(s => s.CurrentMark.ToString()).Aggregate((s1, s2) => $"{s1};{s2}");
            }

            context.SaveChanges();
        }

        public void MarkAsAbsent(int participTestId)
        {
            var participTest = context.ParticipTests.Find(participTestId);

            if (participTest== null)
                throw new EntityNotFoundOrAccessException("неверный ключ запроса");

            participTest.Grade5 = -1;
            participTest.GradeString = null;
            participTest.PrimaryMark = null;

            var entity = context.Results.Find(participTestId);
            if(entity != null)
            {
                context.Results.Remove(entity);
            }

            context.SaveChanges();
        }

        private IQueryable<ParticipTest> FilterQuery(IQueryable<ParticipTest> participTests, ListGetOptions options)
        {
            if (!String.IsNullOrEmpty(options.Search))
            {
                participTests = participTests.Where(p => p.ParticipId.ToString().Contains(options.Search)
                                              || p.Particip.Surname.Contains(options.Search)
                                              || p.Particip.Name.Contains(options.Search));
            }

            if (!String.IsNullOrEmpty(options.ClassId))
            {
                participTests = participTests.Where(p => p.Particip.ClassId == options.ClassId);
            }

            return participTests;
        }

        private string GetMarks(ParticipTest participTest)
        {
            if (participTest.Grade5 == -1)
            {
                return "отсутствовал";
            }
            else if (participTest.Result == null)
            {
                return null;
            }
            else
            {
                return participTest.Result.Marks;
            }
        }

        private int GetGrade5(IEnumerable<QuestionResultDto> resultDto)
        {
            var primaryMark = GetPrimaryMark(resultDto);

            if (primaryMark <= 3)
            {
                return 2;
            }
            if (primaryMark > 3 && primaryMark <= 6)
            {
                return 3;
            }
            if (primaryMark > 6 && primaryMark <= 8)
            {
                return 4;
            }
            if (primaryMark > 8 && primaryMark <= 10)
            {
                return 5;
            }

            throw new ArgumentException("Неправильный формат CurrentMarks");
        }

        private string GetGradeStr(IEnumerable<QuestionResultDto> resultDto)
        {
            var grade5 = GetGrade5(resultDto);

            switch (grade5)
            {
                case 2:
                    return "группа экстра-риска";
                case 3:
                    return "группа риска";
                case 4:
                    return "стабильная середина";
                case 5:
                    return "высокая возрастная группа";
                default:
                    throw new ArgumentException("Неправильный формат Grade5");
            }
        }

        private double GetPrimaryMark(IEnumerable<QuestionResultDto> resultDto)
        {
            return (double)resultDto.Select(s => s.CurrentMark).Sum();
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
                Step = 1,
                MaxMark = 1
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
