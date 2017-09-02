using Monit95App.Domain.Core.Entities;
using Monit95App.Services.Interfaces;
using System.Linq;
using System.Collections.Generic;
using System.Web.Http;
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
        public IEnumerable<Class> Get()
        {
            return _classService.GetAll().OrderBy(x => x.Id).Select(s => new Class { Id = s.Id.Trim(), Name = s.Name.Trim() });
        }
    }
}
