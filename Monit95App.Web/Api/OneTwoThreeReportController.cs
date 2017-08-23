using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Web.Api
{
    public class OneTwoThreeReportController : ApiController
    {
        private IExerciseMarkService _exerciseMarkService;
        private ITestResultV2Service _testResultV2Service;
        private IGrade5 _gradeConverter;

        public OneTwoThreeReportController(IExerciseMarkService exerciseMarkService, ITestResultV2Service testResultV2Service, IGrade5 gradeConverter)
        {
            _exerciseMarkService = exerciseMarkService;
            _testResultV2Service = testResultV2Service;

            _gradeConverter = gradeConverter;
        }

        public async Task<Dictionary<string, OneTwoThreeReportDto>> GetReport(string schoolId, int participId)
        {
            if (!String.IsNullOrEmpty(schoolId) && participId != 0)
            {
                var marks = await _exerciseMarkService.GetBySchoolIdAsync(schoolId, OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.All));
                var participMarks = marks.Where(p => p.ProjectParticipId == participId).ToList();

                var participMarksRU = participMarks.SingleOrDefault(p => OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.RU).Contains(p.TestId.ToUpper())) ?? new ExerciseMarkModel { Id = 0, Marks = "Результаты не найдены" };
                var participMarksMA = participMarks.SingleOrDefault(p => OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.MA).Contains(p.TestId.ToUpper())) ?? new ExerciseMarkModel { Id = 0, Marks = "Результаты не найдены" };
                var participMarksCHT = participMarks.SingleOrDefault(p => OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.CHT).Contains(p.TestId.ToUpper())) ?? new ExerciseMarkModel { Id = 0, Marks = "Результаты не найдены" };

                var testResults = await _testResultV2Service.GetByParticipIdAsync(participId);

                var testResultRU = testResults.SingleOrDefault(p => p.ExerciseMarkId == participMarksRU.Id) ?? new TestResultV2Dto { Grade5 = -1, Skills = "Умения не найдены" };
                var testResultMA = testResults.SingleOrDefault(p => p.ExerciseMarkId == participMarksMA.Id) ?? new TestResultV2Dto { Grade5 = -1, Skills = "Умения не найдены" };
                var testResultCHT = testResults.SingleOrDefault(p => p.ExerciseMarkId == participMarksCHT.Id) ?? new TestResultV2Dto { Grade5 = -1, Skills = "Умения не найдены" };

                var result = new Dictionary<string, OneTwoThreeReportDto>();
                result.Add("RU", new OneTwoThreeReportDto { GradeStr = _gradeConverter.ConvertToString(testResultRU.Grade5), Marks = participMarksRU.Marks, Skills = testResultRU.Skills });
                result.Add("MA", new OneTwoThreeReportDto { GradeStr = _gradeConverter.ConvertToString(testResultMA.Grade5), Marks = participMarksMA.Marks, Skills = testResultMA.Skills });
                result.Add("CHT", new OneTwoThreeReportDto { GradeStr = _gradeConverter.ConvertToString(testResultCHT.Grade5), Marks = participMarksCHT.Marks, Skills = testResultCHT.Skills }); 

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
