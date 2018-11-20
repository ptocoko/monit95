using Monit95App.Services.ItakeEge.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API.iTakeEge
{
    [Authorize(Roles = "school")]
    [RoutePrefix("api/iTakeEge/reports")]
    public class ReportsController : ApiController
    {
        private readonly ReportService reportService;

        public ReportsController(ReportService reportService)
        {
            this.reportService = reportService;
        }

        [HttpGet]
        [Route("info/{projectId:int}")]
        public HttpResponseMessage GetReportsInfo([FromUri] int projectId)
        {
            var serviceResult = reportService.GetReportInfo(projectId);
            var response = new HttpResponseMessage();

            if (serviceResult.HasError)
            {
                var error = serviceResult.Errors.First();
                HttpError err = new HttpError(error.Description);
                return Request.CreateResponse((HttpStatusCode)error.HttpCode, err);
            }

            return Request.CreateResponse(HttpStatusCode.OK, serviceResult.Result);
        }

        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetReportsList([FromUri] ReportsSearchDto searchDto)
        {
            var response = new HttpResponseMessage();
            var schoolId = User.Identity.Name;
            var serviceResult = reportService.GetRepostsList(searchDto, schoolId);

            if (serviceResult.HasError)
            {
                var error = serviceResult.Errors.First();
                HttpError err = new HttpError(error.Description);
                return Request.CreateResponse((HttpStatusCode)error.HttpCode, err);
            }

            return Request.CreateResponse(HttpStatusCode.OK, serviceResult.Result);
        }
    }
}
