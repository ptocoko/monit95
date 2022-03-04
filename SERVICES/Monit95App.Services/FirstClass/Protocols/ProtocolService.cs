using DocumentFormat.OpenXml.Office2010.Excel;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using Monit95App.Services.FirstClass.Dtos;
using ServiceResult.Exceptions;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.InteropServices;
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

        public async Task<ProtocolsList> GetProtocols(string schoolId, int projectTestId, ListGetOptions options)
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

            var processedProtocolsCount = await entity.CountAsync(p => p.Grade5 != null);
            var notProcessedProtocolsCount = await entity.CountAsync(p => p.Grade5 == null);

            IEnumerable<ClassDto> classes = await entity
                .Select(s => new ClassDto { Id = s.Particip.ClassId, Name = s.Particip.Class.Name })
                .GroupBy(gb => gb.Id)
                .Select(s => s.FirstOrDefault())
                .OrderBy(ob => ob.Id)
                .ToListAsync();

            entity = FilterQuery(entity, options);

            var totalCount = await entity.CountAsync();

            entity = entity.OrderBy(ob => ob.Particip.ClassId).ThenBy(tb => tb.Particip.Surname).ThenBy(tb => tb.Particip.Name);
            entity = entity.Skip(offset).Take(length);

            var participTests = (await entity
                .Include("Result")
                .ToListAsync())
                .Select(s => new ProtocolGetDto
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
                ProcessedItemsCount = processedProtocolsCount,
                NotProcessedItemsCount = notProcessedProtocolsCount,
                Classes = classes
            };
        }

        public async Task<ProtocolPostDto> GetEditProtocol(int participTestId, string year)
        {
            var entity = await context.ParticipTests
                .Include("Particip")
                .Include("Result")
                .SingleOrDefaultAsync(pt => pt.Id == participTestId);

            if (entity == null)
            {
                throw new EntityNotFoundOrAccessException("неверный ключ запроса");
            }

            //var 

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

                var subQuestions = await context.FirstClassSubResults.Where(p => p.ParticipTestId == participTestId).OrderBy(ob => ob.QuestionId).ToListAsync();
                if (subQuestions != null && subQuestions.Count > 0)
                {
                    editDto.SubQuestionResults = subQuestions.Select(s => new SubQuestionResultDto { QuestionId = s.QuestionId, MaxMark = s.Question.MaxMark, CurrentMark = s.Value }).ToArray();
                }
                else
                {
                    var newSubQuestions = await context.FirstClassQuestions.Where(p => p.Year == year).OrderBy(ob => ob.Id).ToArrayAsync();
                    editDto.SubQuestionResults = newSubQuestions.Select(s => new SubQuestionResultDto { QuestionId = s.Id, MaxMark = s.MaxMark }).ToArray();
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
            else
            {
                var newSubQuestions = await context.FirstClassQuestions.Where(p => p.Year == year).OrderBy(ob => ob.Id).ToArrayAsync();
                editDto.SubQuestionResults = newSubQuestions.Select(s => new SubQuestionResultDto { QuestionId = s.Id, MaxMark = s.MaxMark }).ToArray();
            }

            return editDto;
        }

        public async Task EditProtocol(ProtocolPostDto protocol)
        {
            var participTestEntity = await context.ParticipTests
                .Include("Result")
                .SingleOrDefaultAsync(pt => pt.Id == protocol.ParticipTestId);

            if (participTestEntity == null)
                throw new EntityNotFoundOrAccessException("неверный ключ запроса");

            if (protocol.SubQuestionResults == null 
                && protocol.SubQuestionResults.Count != 12
                && !protocol.SubQuestionResults.All(p => p.CurrentMark.HasValue && p.CurrentMark.Value <= p.MaxMark))
            {
                throw new ArgumentException("неверный формат запроса");
            }
            
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

            var subResults = await context.FirstClassSubResults.Where(p => p.ParticipTestId == protocol.ParticipTestId).ToListAsync();
            if (subResults != null && subResults.Count > 0)
            {
                context.FirstClassSubResults.RemoveRange(subResults);
            }

            context.FirstClassSubResults.AddRange(protocol.SubQuestionResults.Select(s => new FirstClassSubResult
            {
                Value = s.CurrentMark.Value,
                QuestionId = s.QuestionId,
                ParticipTestId = protocol.ParticipTestId
            }));

            await context.SaveChangesAsync();
        }

        public async Task MarkAsAbsent(int participTestId)
        {
            var participTest = await context.ParticipTests
                .FindAsync(participTestId);

            if (participTest== null)
                throw new EntityNotFoundOrAccessException("неверный ключ запроса");

            participTest.Grade5 = -1;
            participTest.GradeString = null;
            participTest.PrimaryMark = null;

            var entity = await context.Results.FindAsync(participTestId);
            if(entity != null)
            {
                context.Results.Remove(entity);
            }

            var subResults = await context.FirstClassSubResults.Where(p => p.ParticipTestId == participTestId).ToListAsync();
            if (subResults != null && subResults.Count > 0)
            {
                context.FirstClassSubResults.RemoveRange(subResults);
            }

            await context.SaveChangesAsync();
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

        private List<int> GetGradesByTask(List<QuestionResultDto> resultDtos)
        {
            var res = new List<int>();
            int getGrade(int curr, int minMax, int minMid)
            {
                if (curr >= minMax)
                {
                    return 5;
                }
                else if (curr >= minMid) 
                {
                    return 4;
                }
                else
                {
                    return 3;
                }
            }

            res.Add(getGrade((int)resultDtos[0].CurrentMark, 14, 7));
            res.Add(getGrade((int)resultDtos[1].CurrentMark, 5, 3));
            res.Add(getGrade((int)resultDtos[2].CurrentMark, 9, 5));
            res.Add(getGrade((int)resultDtos[3].CurrentMark, 16, 15));

            return res;
        }



        private int GetGrade5(IEnumerable<QuestionResultDto> resultDto)
        {
            var grades = GetGradesByTask(resultDto.ToList());
            if (grades.All(g => g == 5))
            {
                return 5;
            }
            else if (grades.All(g => g >= 4))
            {
                return 4;
            }
            else if (grades.Count(g => g == 3) >= 3)
            {
                return 2;
            }
            else
            {
                return 3;
            }

            //var primaryMark = GetPrimaryMark(resultDto);

            //if (primaryMark <= 3)
            //{
            //    return 2;
            //}
            //if (primaryMark > 3 && primaryMark <= 6)
            //{
            //    return 3;
            //}
            //if (primaryMark > 6 && primaryMark <= 8)
            //{
            //    return 4;
            //}
            //if (primaryMark > 8 && primaryMark <= 10)
            //{
            //    return 5;
            //}

            //throw new ArgumentException("Неправильный формат CurrentMarks");
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
                Name = "Графический диктант",
                Step = 1,
                MaxMark = 16
            },
            new FirstClassResultModel
            {
                Name = "Дорожки",
                Step = 1,
                MaxMark = 5
            },
            new FirstClassResultModel
            {
                Name = "Образец и правило",
                Step = 1,
                MaxMark = 12
            },
            new FirstClassResultModel
            {
                Name = "Звуковые прятки",
                Step = 1,
                MaxMark = 16
            }
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
