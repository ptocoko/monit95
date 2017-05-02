﻿using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Infrastructure.Data.Interfaces;
using Monit95App.Services.DTO;
using Monit95App.Services.DTO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{
    public class OneTwoThreeReportController : ApiController
    {
        private IExerciseMarkService _exerciseMarkService;
        private IProjectParticipV2Service _projectParticipV2Service;
        private ITestResultV2Service _testResultV2Service;
        private IGrade5 _gradeConverter;

        public OneTwoThreeReportController()
        {
            var _unitOfWork = new UnitOfWorkV2(new cokoContext());

            var _projectParticipV2Rep = new Repository<ProjectParticipsV2>(_unitOfWork);
            var _exerciseMarkRep = new Repository<ExerciseMark>(_unitOfWork);
            var _testResultV2Rep = new Repository<TestResultsV2>(_unitOfWork);
            var _classRep = new Repository<Class>(_unitOfWork);

            var _classServise = new ClassService(_unitOfWork, _classRep);
            _projectParticipV2Service = new ProjectParticipV2Service(_unitOfWork, _projectParticipV2Rep, _classServise);
            _exerciseMarkService = new ExerciseMarkService(_unitOfWork, _exerciseMarkRep);
            _testResultV2Service = new TestResultV2Service(_testResultV2Rep, _exerciseMarkRep);

            _gradeConverter = new OneTwoThreeGradeConverter();
        }

        public async Task<Dictionary<string, OneTwoThreeReportDto>> GetReport(string schoolId, int participId)
        {
            if (!String.IsNullOrEmpty(schoolId) && participId != 0)
            {
                var marks = await _exerciseMarkService.GetBySchoolIdAsync(schoolId, OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.All));
                var participMarks = marks.Where(p => p.ProjectParticipId == participId).ToList();

                var participMarksRU = participMarks.SingleOrDefault(p => OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.RU).Contains(p.TestId.ToUpper())) ?? new ExerciseMarkDto { Id = 0, Marks = "Результаты не найдены" };
                var participMarksMA = participMarks.SingleOrDefault(p => OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.MA).Contains(p.TestId.ToUpper())) ?? new ExerciseMarkDto { Id = 0, Marks = "Результаты не найдены" };

                var testResults = await _testResultV2Service.GetByParticipIdAsync(participId);

                var testResultRU = testResults.SingleOrDefault(p => p.ExerciseMarkId == participMarksRU.Id) ?? new TestResultV2Dto { Grade5 = -1, Skills = "Умения не найдены" };
                var testResultMA = testResults.SingleOrDefault(p => p.ExerciseMarkId == participMarksMA.Id) ?? new TestResultV2Dto { Grade5 = -1, Skills = "Умения не найдены" };

                var result = new Dictionary<string, OneTwoThreeReportDto>();
                result.Add("RU", new OneTwoThreeReportDto { GradeStr = _gradeConverter.ConvertToString(testResultRU.Grade5), Marks = participMarksRU.Marks, Skills = testResultRU.Skills });
                result.Add("MA", new OneTwoThreeReportDto { GradeStr = _gradeConverter.ConvertToString(testResultMA.Grade5), Marks = participMarksMA.Marks, Skills = testResultMA.Skills });

                return result;
            }
            else
            {
                throw new ArgumentNullException();
            }
        }

        [HttpGet]
        public async Task<IEnumerable<int>> GetParticipIdsWithMarks(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                var marks = await _exerciseMarkService.GetBySchoolIdAsync(id, OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.RU));
                return marks.Select(s => s.ProjectParticipId);
            }
            else
            {
                throw new ArgumentNullException();
            }
        }
    }
}
