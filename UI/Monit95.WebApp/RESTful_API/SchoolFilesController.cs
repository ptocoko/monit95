using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using System.Web.Http;
using System.Linq;
using System;

namespace Monit95App.RESTful_API
{
    //[Authorize(Roles = "school")]
    [RoutePrefix("api/schoolFiles")]
    public class SchoolFilesController : ApiController
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        public SchoolFilesController(CokoContext context)
        {
            this.context = context;
        }

        [Route("")]
        public IHttpActionResult Get()
        {            
            var model = ReportMetaHandler.GetReportMetasBySchool(context.Schools.Find(User.Identity.Name), new SchoolReportFileNameOffline());

            return Ok(model.Where(rm => rm.IsShow == true).OrderByDescending(x => x.Date));
        }

        [HttpGet]
        [Route("isGot/{id}")]
        public IHttpActionResult ReportStatus()
        {
            int reportId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            string schoolId = "0005";//User.Identity.Name;

            bool? isGot = context.SchoolReportsCollectors.SingleOrDefault(p => p.ProjectId == reportId && p.SchoolId == schoolId)?.IsGot;

            return Ok(isGot ?? false);
        }

        [HttpPost]
        [Route("isGot/{id}")]
        public IHttpActionResult ReportIsGot()
        {
            int reportId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            string schoolId = "0005";//User.Identity.Name;

            // если в таблице базы данных нет соответствующей записи, то создаем ее
            var reportCollector = context.SchoolReportsCollectors.SingleOrDefault(p => p.ProjectId == reportId && p.SchoolId == schoolId);
            if(reportCollector == null)
            {
                context.SchoolReportsCollectors.Add(new Domain.Core.Entities.SchoolReportsCollector
                {
                    ProjectId = reportId,
                    SchoolId = schoolId,
                    IsGot = true
                });
            }
            else
            {
                context.SchoolReportsCollectors.Single(p => p.ProjectId == reportId && p.SchoolId == schoolId).IsGot = true;
            }

            context.SaveChanges();

            return Ok();
        }
    }
}
