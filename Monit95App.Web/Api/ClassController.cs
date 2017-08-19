using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Monit95App.Services.Interfaces;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Api
{
    public class ClassController : ApiController
    {
        private readonly IClassService _classService;

        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        [Route("api/classes")]
        [HttpGet]
        public IEnumerable<Class> Get()
        {
            var res = _classService.GetAll().OrderBy(x => x.Id).Take(36).Select(s => new Class { Id = s.Id, Name = s.Name });
            return res;
        }
    }
}
