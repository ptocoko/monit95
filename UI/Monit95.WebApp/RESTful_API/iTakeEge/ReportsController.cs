using Monit95App    .Services.ItakeEge.Report;
using ServiceResult;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API.iTakeEge
{
    [Authorize(Roles = "school, area")]
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
            ServiceResult<ReportInfoDto> serviceResult = null;
            if (User.IsInRole("area"))
            {
                var areaCode = int.Parse(User.Identity.Name);
                serviceResult = reportService.GetReportInfo(projectId, areaCode);
            }
            else if (User.IsInRole("school"))
            {
                serviceResult = reportService.GetReportInfo(projectId);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Not Allowed for current user");
            }

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
            ServiceResult<ReportsListDto> serviceResult = null;

            if (User.IsInRole("school") && !User.IsInRole("area"))
            {
                var schoolId = User.Identity.Name;
                serviceResult = reportService.GetRepostsList(searchDto, schoolId);
            }
            else if (User.IsInRole("area") && !User.IsInRole("school"))
            {
                var areaCode = int.Parse(User.Identity.Name);
                var schoolId = searchDto.SchoolId;
                serviceResult = reportService.GetRepostsList(searchDto, schoolId, areaCode);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Что то не так с ролями");
            }

            if (serviceResult.HasError)
            {
                var error = serviceResult.Errors.First();
                HttpError err = new HttpError(error.Description);
                return Request.CreateResponse((HttpStatusCode)error.HttpCode, err);
            }

            return Request.CreateResponse(HttpStatusCode.OK, serviceResult.Result);
        }

        [HttpGet]
        [Route("extend/{participTestId:int}")]
        public HttpResponseMessage GetExtendReport([FromUri] int participTestId)
        {
            var response = new HttpResponseMessage();
            var serviceResult = reportService.GetReport(participTestId);

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
