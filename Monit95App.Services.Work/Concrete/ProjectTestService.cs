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
        public ProjectTestService(cokoContext db, IParticipTestService participTestService)
        {
            _db = db;            
        }
        //TODO: тут явно необходима жадная загрузка
        public IEnumerable<ProjectTestDto> GetOpenTests(int projectCode, int areaCode, string schoolId)
        {            
            return new List<ProjectTestDto>();
        }
    }
}
