using Monit95App.Infrastructure.Data;
using Monit95App.Services;
using System.Web.Http;
using System.Linq;

namespace Monit95App.RESTful_API
{
    [Authorize(Roles = "school")]
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

    }
}
