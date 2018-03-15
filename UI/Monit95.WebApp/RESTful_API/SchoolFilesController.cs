using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using System.Web.Http;
using System.Linq;
using System;
using Monit95App.Services.SchoolFiles;

namespace Monit95App.RESTful_API
{
    [Authorize(Roles = "school")]
    [RoutePrefix("api/schoolFiles")]
    public class SchoolFilesController : ApiController
    {
        #region Dependencies

        //private readonly CokoContext context;
        private readonly IReportMetaHandler reportMetaHandler;

        #endregion

        public SchoolFilesController(IReportMetaHandler reportMetaHandler)
        {
            //this.context = context;
            this.reportMetaHandler = reportMetaHandler;
        }

        [Route("")]
        public IHttpActionResult Get()
        {
            var schoolId = User.Identity.Name;
            var model = reportMetaHandler.GetReportMetasBySchool(schoolId, new SchoolReportFileNameOffline())
                            .Where(rm => rm.IsShow == true).OrderByDescending(x => x.Date).ToList();

            return Ok(model);
        }

        [HttpPost]
        [Route("isGot/{id}")]
        public IHttpActionResult ReportIsGot()
        {
            int reportId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            string schoolId = User.Identity.Name;
            
            reportMetaHandler.SetReportIsGot(reportId, schoolId);
            
            return Ok();
        }
    }
}
