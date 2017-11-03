using System;
using System.Collections.Generic;
using System.Web.Http;
using Monit95App.Services.Rsur.ParticipReport;
using WebApi.OutputCache.V2;
using System.Web;
using System.IO;

namespace Monit95App.RESTful_API.Rsur
{
    [RoutePrefix("api/rsur/participReports")]
    [Authorize(Roles = "area, rsur-particip, school")]
    public class RsurParticipReportsController : ApiController
    {
        #region Dependencies

        private readonly IParticipReportService participReportService;

        #endregion

        public RsurParticipReportsController(IParticipReportService participReportService)
        {
            this.participReportService = participReportService;
        }

        #region APIs

        [HttpGet]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Get()
        {
            var rsurParticipTestId = int.Parse(RequestContext.RouteData.Values["rsurParticipTestId"].ToString());
            var report = participReportService.GetReport(rsurParticipTestId);

            return Ok(report);
        }

        [HttpGet]   
        [Route("")]
        public IHttpActionResult Get(string testDate)
        {
            if (!DateTime.TryParse(testDate, out DateTime testDateObj)) return BadRequest("Cannot parse testDate string to DateTime object");

            IEnumerable<ParticipReport> rsurResults = null;
            if (User.IsInRole("area"))
            {
                var areaCode = int.Parse(User.Identity.Name);
                try
                {
                    rsurResults = participReportService.GetResultsForArea(areaCode, testDateObj);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else if(User.IsInRole("school"))
            {
                var schoolId = User.Identity.Name;
                try
                {
                    rsurResults = participReportService.GetResultsForSchool(schoolId, testDateObj);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else if (User.IsInRole("rsur-particip"))
            {
                var participCode = int.Parse(User.Identity.Name);
                try
                {
                    rsurResults = participReportService.GetResultsForParticip(participCode, testDateObj);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }

            }
            return Ok(rsurResults);
        }

        [HttpPost]
        [Authorize(Roles = "school")]
        [Route("~/api/rsur/reports")]
        public IHttpActionResult UploadText([FromBody]ReportTextDto textDto)
        {
            string schoolId = User.Identity.Name;
            if (ModelState.IsValid)
            {
                var reportId = participReportService.SaveText(textDto.Text, schoolId);
                return Ok(reportId);
            }
            else
            {
                return BadRequest("Something wrong with text");
            }
        }

        [HttpPost]
        [Authorize(Roles = "school")]
        [Route("~/api/rsur/reports/{reportId:int}/files")]
        public IHttpActionResult UploadFiles()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["reportId"].ToString());
            var httpRequest = HttpContext.Current.Request;

            for(int i = 0; i < httpRequest.Files.Count; i++)
            {
                HttpPostedFile file = httpRequest.Files[i];
                string fileExtension = Path.GetExtension(file.FileName);
                var fileId = participReportService.SaveFile(file.InputStream, fileExtension, reportId);

                participReportService.CreateRsurReportFilesEntry(reportId, fileId);
            }

            return Ok();
        }
        #endregion
    }

    public class ReportTextDto
    {
        public string Text { get; set; }
    }
}
