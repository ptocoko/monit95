using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
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
        private IOneTwoThreeReportService _oneTwoThreeReportService;
        private IExerciseMarkService _exerciseMarkService;
        private IProjectParticipV2Service _projectParticipV2Service;
        private ITestResultV2Service _testResultV2Service;
        private IClassService _classServise;

        private IUnitOfWork _unitOfWork;

        private IRepositoryV2<ProjectParticipsV2> _projectParticipV2Rep;
        private IRepositoryV2<ExerciseMark> _exerciseMarkRep;
        private IRepositoryV2<TestResultsV2> _testResultV2Rep;
        private IRepositoryV2<Class> _classRep;

        public OneTwoThreeReportController()
        {
            _unitOfWork = new UnitOfWorkV2(new cokoContext());

            _projectParticipV2Rep = new Repository<ProjectParticipsV2>(_unitOfWork);
            _exerciseMarkRep = new Repository<ExerciseMark>(_unitOfWork);
            _testResultV2Rep = new Repository<TestResultsV2>(_unitOfWork);
            _classRep = new Repository<Class>(_unitOfWork);

            _classServise = new ClassService(_unitOfWork, _classRep);
            _projectParticipV2Service = new ProjectParticipV2Service(_unitOfWork, _projectParticipV2Rep, _classServise);
            _exerciseMarkService = new ExerciseMarkService(_unitOfWork, _exerciseMarkRep);
            _testResultV2Service = new TestResultV2Service(_testResultV2Rep, _unitOfWork);
            _oneTwoThreeReportService = new OneTwoThreeReportService(_projectParticipV2Service, _exerciseMarkService, _testResultV2Service, new OneTwoThreeGradeConverter());
        }

        public async Task<OneTwoThreeReportDto> GetReport(int id)
        {
            string[] tests = new string[] { "C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1", "CCE3AB81-F9CC-4139-AF54-2A6E3E287D86", "BB55D9EE-4177-4FB9-B825-7BE22455B626" };
            
            return await _oneTwoThreeReportService.GetReportByParticipIdAsync(id, tests);
        }
    }
}
