using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Monit95App.Services.Work.Abstract;
using Monit95App.Domain.Interfaces;
using System.Collections;
using Monit95App.Services.DTO;

namespace Monit95App.Services.Work.Concrete
{
    public class ProjectTestService : IProjectTestService
    {
        private cokoContext _db;
        private IParticipTestService _participTestService;
        public ProjectTestService(cokoContext db, IExerMarkDTOcreator exerMarkDTOcreator, IParticipTestService participTestService)
        {
            _db = db;
            _participTestService = participTestService;
        }
        //TODO: тут явно необходима жадная загрузка
        public IEnumerable<ProjectTestDTO> GetOpenProjectTestDTOs(int projectCode, int areaCode, string schoolId)
        {
            var openProjectTests = _db.ProjectTests.Where(x => x.ProjectCode == projectCode && x.StatusCode == true);

            //получает те проекты в которых присутствуют участники указанного (areaCode) муниципалитета
            if (areaCode != 0)
            {
                openProjectTests = openProjectTests.Where(x => x.ParticipTests.Any(y => y.ProjectParticip.School.AreaCode == areaCode));
            }

            //получает те проекты в которых присутствуют участники указанной организации (schoolId)
            if (!String.IsNullOrEmpty(schoolId))
            {
                openProjectTests = openProjectTests.Where(x => x.ParticipTests.Any(y => y.ProjectParticip.SchoolId == schoolId));
            }
                    
            //TODO: просто очень необходим рефакторинг                                                         
            var projectTestDTOs = new List<ProjectTestDTO>();
            if (openProjectTests != null)
            {
                projectTestDTOs = openProjectTests.ToList().Select(x => new ProjectTestDTO
                {
                    ProjectCode = x.ProjectCode,
                    TestId = x.TestId,
                    TestNumberCode = x.Test.NumberCode,
                    TestName = x.Test.Name,
                    TestNumber = x.TestNumber,
                    TestDate = x.TestDate,
                    ParticipTestDTOs = x.ParticipTests.Select(y => _participTestService.GetDto(y))                    
                
                }).ToList();
            }

            return projectTestDTOs;
        }
    }
}
