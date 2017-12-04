using System.Diagnostics.CodeAnalysis;
using Monit95App.Services.Rsur.SeminarReport;
using System.IO;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace Monit95App.RESTful_API.Rsur
{
    [RoutePrefix("api/rsur/seminarReports")]
    [Authorize(Roles = "area, school")]    
    public class SeminarReportsController : ApiController
    {
        #region Dependencies

        private readonly ISeminarReportService seminarReportService;

        #endregion

        public SeminarReportsController(ISeminarReportService seminarReportService)
        {
            this.seminarReportService = seminarReportService;
        }

        #region APIs                    

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
            for (var i = 0; i < httpRequest.Files.Count; i++)
            {
                var file = httpRequest.Files[i];
                var fileExtension = Path.GetExtension(file.FileName);
                seminarReportService.SaveFile(file.InputStream, fileExtension, reportId, i + 1, imagesFolder);
            }

            return Ok();
        }

        [HttpGet, Route("")]                
        public IHttpActionResult GetSeminarReports()
        {
            if (User.IsInRole("school"))
            {
                var schoolId = User.Identity.Name;
                return Ok(seminarReportService.GetSeminarReports(schoolId));
            }

            if (!User.IsInRole("area"))
            {
                return BadRequest();
            }
            var areaCode = int.Parse(User.Identity.Name);

            return Ok(seminarReportService.GetSeminarReports(areaCode));
        }

        [HttpGet, Route("{id:int}")]        
        public IHttpActionResult GetReport()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());

            return Ok(seminarReportService.GetReport(reportId));
        }

        [HttpDelete, Route("{id:int}")]        
        public IHttpActionResult DeleteReport()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());
            var imagesFolder = HostingEnvironment.MapPath("~/Images/seminar-photos");

            seminarReportService.DeleteReport(reportId, imagesFolder);

            return Ok();
        }

        #endregion
    }
}
