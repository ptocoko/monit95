using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTO;
using Monit95App.Services.DTO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    public class ClassController : ApiController
    {
        private IClassService _classService;
                
        public ClassController()
        {
            var unitOfWork = new UnitOfWorkV2(new cokoContext());
            var classRepository = new Repository<Class>(unitOfWork);
            _classService = new ClassService(unitOfWork, classRepository);

        }
        public IEnumerable<Class> Get()
        {
            return _classService.GetAll();
        }
    }
}
