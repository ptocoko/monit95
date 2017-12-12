using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using Monit95App.Domain.Core.Entities;
using Monit95App.Services.Interfaces;

// ReSharper disable CheckNamespace
namespace Monit95App.Web.Api
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
        public IEnumerable<object> Get()
        {
            return _classService.GetAll().OrderBy(x => x.Id).Select(s => new { Id = s.Id.Trim(), Name = s.Name.Trim() });
        }
    }
}
