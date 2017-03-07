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
    public class ExerMarkController : ApiController
    {
        private UnitOfWork _uow;
        private ISelector _selector;  
        public ExerMarkController(cokoContext db, ISelector selector)
        {
            _uow = new UnitOfWork(db);
            _selector = selector;
        }
        public ExerMarkController()
        {
            _uow = new UnitOfWork(new cokoContext());
            _selector = new Selector(new cokoContext(), new ExerMarkDTOcreator());
        }     

        public IEnumerable<ProjectTestDTO> GetOpenProjectTest(int projectCode, int areaCode, string schoolId = null)
        {
          return _selector.GetOpenProjectTestForArea(projectCode, areaCode, schoolId);
        }
    }
}
