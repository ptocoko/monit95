using System.Diagnostics.CodeAnalysis;
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
        #region Dependencies

        private readonly ISeminarReportService seminarReportService;

        #endregion

        public SeminarReportsController(ISeminarReportService seminarReportService)
        {
            this.seminarReportService = seminarReportService;
        }

        [HttpPost, Route("")]
        [Authorize(Roles = "school")]        
        [SuppressMessage("ReSharper", "SuggestVarOrType_BuiltInTypes")]
        public IHttpActionResult PostReportText([FromBody]ReportTextDto textDto)
        {            
            if (!ModelState.IsValid)
            {
                return BadRequest("Something wrong with text");
            }
            string schoolId = User.Identity.Name;
            var reportId = seminarReportService.SaveText(textDto.Text, schoolId);
            return Ok(reportId);
        }

        [HttpPost, Route("{id:int}/files")]
        [Authorize(Roles = "school")]        
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
            if (User.IsInRole("school"))
            {
                string schoolId = User.Identity.Name;

                return Ok(seminarReportService.GetSeminarReports(schoolId));
            }
            else if(User.IsInRole("area"))
            {
                int areaCode = int.Parse(User.Identity.Name);

                return Ok(seminarReportService.GetSeminarReports(areaCode));
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetReport()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());

            return Ok(seminarReportService.GetReport(reportId));
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult DeleteReport()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());
            var imagesFolder = HostingEnvironment.MapPath("~/Images/seminar-photos");

            seminarReportService.DeleteReport(reportId, imagesFolder);

            return Ok();
        }
    }
}
