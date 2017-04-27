using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Infrastructure.Data.Interfaces;
using Monit95App.Services.DTO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO
{
    public class OneTwoThreeReportService : IOneTwoThreeReportService
    {
        private IProjectParticipV2Service _projectParticipV2Service;
        private IExerciseMarkService _exerciseMarkService;
        private ITestResultV2Service _testResultV2Service;
        private IGrade5 _gradeConverter;

        public OneTwoThreeReportService(IProjectParticipV2Service projectParticipV2Service, IExerciseMarkService exerciseMarkService, ITestResultV2Service testResultService, IGrade5 gradeConverter)
        {
            _projectParticipV2Service = projectParticipV2Service;
            _exerciseMarkService = exerciseMarkService;
            _testResultV2Service = testResultService;
            _gradeConverter = gradeConverter;
        }

        public async Task<OneTwoThreeReportDto> GetReportByParticipIdAsync(int participId, string[] tests)
        {
            if(participId != 0)
            {
                var particip = await _projectParticipV2Service.GetByParticipIdAsync(participId);
                var marks = await _exerciseMarkService.GetBySchoolIdAsync(particip.SchoolId, tests);
                var participMarks = marks.Where(p => p.ProjectParticipId == participId).Single();

                var testResult = await _testResultV2Service.GetByMarkIdAsync(participMarks.Id);
                return new OneTwoThreeReportDto { GradeStr = _gradeConverter.ConvertToString(testResult.Grade5), Surname = particip.Surname, Name = particip.Name, SecondName = particip.SecondName, Marks = participMarks.Marks, Skills = testResult.Skills };
            }
            else
            {
                throw new ArgumentNullException();
            }
        }
    }
}
