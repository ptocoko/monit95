using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Models;
using Monit95App.Models.Abstarct;
using Monit95App.Services.DTO;
using Monit95App.Services.Work.Abstract;
using Monit95App.Services.Work.Concrete;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize]
    public class ExerMarkController : ApiController
    {
        private UnitOfWork _uow;
        private IProjectTestService _projectTestService;
        private IParticipTestService _participTestService;
        public ExerMarkController(cokoContext db, IProjectTestService projectTestService, IParticipTestService participTestService)
        {
            _uow = new UnitOfWork(db);
            _projectTestService = projectTestService;
            _participTestService = participTestService;
        }
        
        public ExerMarkController()
        {
            _uow = new UnitOfWork(new cokoContext());
            _projectTestService = new ProjectTestService(new cokoContext(), new ExerMarkDTOcreator(), new ParticipTestService(new cokoContext(), new ExerMarkDTOcreator()));
        }     

        public IEnumerable<ProjectTestDTO> GetOpenProjectTestDTOs(int projectCode, int areaCode, string schoolId = null)
        {
          return _projectTestService.GetOpenProjectTestDTOs(projectCode, areaCode, schoolId);
        }


        public ParticipTestDTO PostParticipTest(ParticipTestDTO participTestDTO)
        {
            //...
            return new ParticipTestDTO();
        }
        
        public ParticipTestDTO GetParticipTestDto(string primaryKeyStr)
        {
            ParticipTest participTest = _uow.ParticipTests.Get(primaryKeyStr);
            if(participTest != null)
            {
                var dto = _participTestService.GetDto(participTest);
                return dto;
            }
            else
            {
                throw new NullReferenceException("participTest = _uow.ParticipTests.Get(primaryKeyStr)");
            }
            
        }
    }
}
