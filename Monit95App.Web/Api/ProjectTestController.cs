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
    public class ProjectTestController : ApiController
    {        
        private IProjectTestService _projectTestService;        
        public ProjectTestController(IProjectTestService projectTestService) //приходится внедрять контекст вместо uow т.к. uow завязан на своствах
        {            
            _projectTestService = projectTestService;            
        }
        
        public ProjectTestController()
        {            
            
        }     

        public IEnumerable<ProjectTestDto> GetOpenTests(int projectCode, int areaCode, string schoolId = null)
        {
          return _projectTestService.GetOpenTests(projectCode, areaCode, schoolId);
        }
                      
    }
}
