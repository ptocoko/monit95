using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{

    public class CollectorDto
    {
        [Required]
        public bool IsFinished { get; set; }
    }

    [Authorize(Roles = "school")]
    [RoutePrefix("api/collectors")]
    public class CollectorsController : ApiController
    {
        private readonly CokoContext _context;

        public CollectorsController(CokoContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("{collectorId:int}")]
        public IHttpActionResult Get()
        {
            var collectorId = Convert.ToInt32(RequestContext.RouteData.Values["collectorId"]);
            var schoolId = User.Identity.Name;

            var schoolCollector = _context.SchoolCollectors.Where(x => x.CollectorId == collectorId && x.SchoolId == schoolId).Single();

            var dto = new CollectorDto
            {
                IsFinished = schoolCollector.IsFinished
            };

            return Ok(dto);
        }
                  
        [HttpPut]
        [Authorize(Roles = "school")]
        [Route("{collectorId:int}")]
        public IHttpActionResult Put([FromBody]CollectorDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var collectorId = Convert.ToInt32(RequestContext.RouteData.Values["collectorId"]);
            var schoolId = User.Identity.Name;
            var entity = _context.SchoolCollectors.Where(x=>x.CollectorId == collectorId && x.SchoolId == schoolId).Single();

            entity.IsFinished = dto.IsFinished;
            _context.SaveChanges();            

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
