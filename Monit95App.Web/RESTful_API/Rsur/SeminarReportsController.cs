using Monit95App.Services.Rsur.SeminarReport;
using System.IO;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace Monit95App.RESTful_API.Rsur
{
    [Authorize(Roles = "area, school")]
    [RoutePrefix("api/rsur/seminarReports")]
    public class SeminarReportsController : ApiController
    {
        #region

        private readonly ISeminarReportService seminarReportService;

        #endregion

        public SeminarReportsController(ISeminarReportService seminarReportService)
        {
            this.seminarReportService = seminarReportService;
        }

        [HttpPost]
        [Authorize(Roles = "school")]
        [Route("")]
        public IHttpActionResult PostReportText([FromBody]ReportTextDto textDto)
        {
            string schoolId = User.Identity.Name;
            if (ModelState.IsValid)
            {
                var reportId = seminarReportService.SaveText(textDto.Text, schoolId);
                return Ok(reportId);
            }
            else
            {
                return BadRequest("Something wrong with text");
            }
        }

        [HttpPost]
        [Authorize(Roles = "school")]
        [Route("{id:int}/files")]
        public IHttpActionResult PostReportFiles()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());
            var httpRequest = HttpContext.Current.Request;

            var imagesFolder = HostingEnvironment.MapPath("~/Images/seminar-photos");
            HttpPostedFile file = null;
            for (int i = 0; i < httpRequest.Files.Count; i++)
            {
                file = httpRequest.Files[i];
                string fileExtension = Path.GetExtension(file.FileName);
                var fileId = seminarReportService.SaveFile(file.InputStream, fileExtension, reportId, i + 1, imagesFolder);
            }

            return Ok();
        }

        [HttpGet]        
        [Route("")]
        public IHttpActionResult GetSeminarReports()
        {
            string schoolId = User.Identity.Name;

            return Ok(seminarReportService.GetSeminarReports(schoolId));
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetReport()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());

            return Ok(seminarReportService.GetReport(reportId));
        }
    }
}
