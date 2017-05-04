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
                
        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        public IEnumerable<Class> Get()
        {
            var res = _classService.GetAll().OrderBy(x=>x.Id).Take(36).Select(s => new Class { Id = s.Id, Name = s.Name });
            return res;
        }
    }
}
