using Monit95App.Services.ItakeEge.Report2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API.iTakeEge
{

    [RoutePrefix("api/iTakeEge/reports2")]
    public class Reports2Controller : ApiController
    {
        private readonly Report2Service service;

        public Reports2Controller(Report2Service service)
        {
            this.service = service;
        }

        [Authorize(Roles = "area")]
        [HttpGet]
        [Route("schools")]
        public HttpResponseMessage Get([FromUri] int projectTestId)
        {
            var areaCode = int.Parse(User.Identity.Name);
            var res = service.GetSchoolsReports(areaCode, projectTestId);
            return Request.CreateResponse(HttpStatusCode.OK, res);
        }
    }
}