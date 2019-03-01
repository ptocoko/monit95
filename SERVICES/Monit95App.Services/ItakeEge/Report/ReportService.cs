﻿using Monit95App.Domain.Core.Abstract;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
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

        public ServiceResult<ReportsListDto> GetRepostsList(ReportsSearchDto searchDto, string schoolId)
        {
            var serviceRes = new ServiceResult<ReportsListDto>();

            if(searchDto.ProjectId == 0 || string.IsNullOrEmpty(schoolId))
            {
                serviceRes.HasError = true;
                serviceRes.Errors = new List<ServiceError>
                {
                    new ServiceError
                    {
                        HttpCode = 400,
                        Description = "неверный запрос"
                    }
                };

                return serviceRes;
            }

            var entities = context.ParticipTests
                .Where(pt => pt.ProjectTest.ProjectId == searchDto.ProjectId && pt.Particip.SchoolId == schoolId);

            if (!string.IsNullOrEmpty(searchDto.TestCode))
            {
                entities = entities.Where(pt => pt.ProjectTest.Test.NumberCode == searchDto.TestCode);
            }
            if (!string.IsNullOrEmpty(searchDto.SearchParticipText))
            {
                var srch = searchDto.SearchParticipText.ToLower();
                entities = entities.Where(pt => pt.Particip.Surname.ToLower().Contains(srch) || pt.Particip.Name.ToLower().Contains(srch));
            }

            var totalCount = entities.Count();

            entities = entities.OrderBy(ob => ob.Particip.Surname)
                .ThenBy(tb => tb.Particip.Name);

            entities = entities.Skip((searchDto.Page - 1) * searchDto.PageSize).Take(searchDto.PageSize);

            serviceRes.Result = new ReportsListDto
            {
                TotalCount = totalCount,
                Page = searchDto.Page,
                Items = entities.Select(s => new ReportItem
                {
                    Surname = s.Particip.Surname,
                    Name = s.Particip.Name,
                    SecondName = s.Particip.SecondName,
                    TestName = s.ProjectTest.Test.Name,
                    TestCode = s.ProjectTest.Test.NumberCode,
                    Grade5 = (int)s.Grade5,
                    Id = s.ParticipId,
                    ParticipTestId = s.Id
                })
            };

            return serviceRes;
        }

        public ServiceResult<ReportInfoDto> GetReportInfo(int projectId)
        {
            var serviceRes = new ServiceResult<ReportInfoDto>();

            var entities = context.ProjectTests.Where(pj => pj.ProjectId == projectId);
            if(entities == null || entities.Count() == 0)
            {
                serviceRes.HasError = true;
                serviceRes.Errors = new List<ServiceError>
                {
                    new ServiceError
                    {
                        HttpCode = 404,
                        Description = "по данному запросу ничего не найдено"
                    }
                };
            }

            serviceRes.Result = new ReportInfoDto
            {
                Tests = entities.Select(s => new TestDto
                {
                    Code = s.Test.NumberCode,
                    Name = s.Test.Name
                })
            };

            return serviceRes;
        }

        public ServiceResult<ReportDto> GetReport(int participTestId)
        {
            var result = new ServiceResult<ReportDto>();

            var entity = context.ParticipTests
                .Include("Particip.School")
                .Include("QuestionMarks")
                .Include("ProjectTest.Test.Questions.EgeQuestion")
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
                ProjectName = entity.ProjectTest.Project.Name,
                ParticipTestId = entity.Id,
                TestDateString = entity.ProjectTest.TestDate.ToString("dd.MM.yyyy"),
                TestName = entity.ProjectTest.Test.Name,
                TestStatus = entity.Grade5 == 2 ? "НЕЗАЧЕТ" : "ЗАЧЕТ",
                Grade5 = entity.Grade5.Value,
                IsRiskGroup = entity.Grade5_v2 == 2,
                ProjectTestId = entity.ProjectTestId,
                PrimaryMark = (int)entity.PrimaryMark,
                Marks = GetMarkDtos(entity),
                ElementsResults = GetElementResults(entity)
            };

            return result;
        }

        private IEnumerable<MarkDto> GetMarkDtos(ParticipTest entity)
        {
            return entity.QuestionMarks.OrderBy(ob => ob.Question.Order).Select(qm => new MarkDto
            {
                Name = qm.Question.Order.ToString(),
                MaxMark = qm.Question.MaxMark,
                AwardedMark = (int)qm.AwardedMark
            });
        }

        private IEnumerable<ElementResultDto> GetElementResults(ParticipTest entity)
        {
            var results = new List<ElementResultDto>();
            var testSubjectCode = int.Parse(entity.ProjectTest.Test.NumberCode);
            if(testSubjectCode == 22)
            {
                testSubjectCode = 2;
            }

            var elements = context.Elements.Where(e => e.SubjectCode == testSubjectCode && e.EgeElementQuestions.Any());

            foreach(var element in elements)
            {
                var elementResDto = new ElementResultDto
                {
                    ElementNumber = element.Code,
                    Name = element.Name
                };

                var egeQuestons = context.EgeElementQuestions.Where(eeq => eeq.ElementId == element.Id).Select(eeq => eeq.EgeQuestion).ToList();
                elementResDto.QuestionNumbers = egeQuestons.Select(eq => eq.Order).OrderBy(ob => ob);

                var egeQuestoinIds = egeQuestons.Select(eq => eq.Id);
                var elementQuestionMarks = entity.QuestionMarks.Where(qm => egeQuestoinIds.Contains(qm.Question.EgeQuestionId)).ToList();
                double awardedByElementValue = elementQuestionMarks.Select(qm => qm.AwardedMark).Sum();
                double maxPossibleElementValue = elementQuestionMarks.Select(qm => qm.Question.MaxMark).Sum();
                elementResDto.Value = Math.Round(awardedByElementValue * 100 / maxPossibleElementValue, MidpointRounding.AwayFromZero);

                results.Add(elementResDto);
            }

            return results;
        }
    }
}