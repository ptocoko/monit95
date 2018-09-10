using Monit95App.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API
{
    [Authorize(Roles = "school, area")]
    [RoutePrefix("api/areas")]
    public class AreasController : ApiController
    {
        private readonly AreasService areasService;

        public AreasController(AreasService areasService)
        {
            this.areasService = areasService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            return Ok(areasService.GetAll());
        }
    }
}