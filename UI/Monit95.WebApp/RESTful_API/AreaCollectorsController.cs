using Monit95App.Api;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API
{
    [Authorize(Roles = "area")]
    [RoutePrefix("api/area-collectors")]
    public class AreaCollectorsController : ApiController
    {
        private readonly CokoContext context;

        public AreaCollectorsController(CokoContext context)
        {
            this.context = context;
        }

        [HttpGet]
        [Route("{collectorId:int}")]
        public IHttpActionResult Get()
        {
            var collectorId = Convert.ToInt32(RequestContext.RouteData.Values["collectorId"]);
            var areaCode = int.Parse(User.Identity.Name);

            var schoolCollector = context.AreaCollectors.AsNoTracking().Where(x => x.CollectorId == collectorId && x.AreaCode == areaCode).Single();

            var dto = new CollectorDto
            {
                IsFinished = schoolCollector.IsFinished
            };

            return Ok(dto);
        }

        [HttpPut]
        [Route("{collectorId:int}")]
        public IHttpActionResult Put([FromBody]CollectorDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var collectorId = Convert.ToInt32(RequestContext.RouteData.Values["collectorId"]);
            var areaCode = int.Parse(User.Identity.Name);
            var entity = context.AreaCollectors.Where(x => x.CollectorId == collectorId && x.AreaCode == areaCode).Single();

            entity.IsFinished = dto.IsFinished;
            context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
