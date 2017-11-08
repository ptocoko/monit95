using Monit95App.Infrastructure.Data;
using System.Web.Mvc;
using Monit95App.Models;
using Monit95App.Services;

namespace Monit95App.Controllers
{
    [Authorize(Roles = "school")]
    public class ReportController : Controller
    {        
        private readonly CokoContext cokoDb;        
        private readonly AppCache appCache = new AppCache();        

        public ReportController(CokoContext cokoContext)
        {
            cokoDb = cokoContext;
        }

        public ReportController()
        {
            cokoDb = new CokoContext();
        }

        [HttpGet]
        public ActionResult Report()
        {
            var model = appCache.GetReportMetas(User.Identity.Name);
            if (model == null)
            {
                model = ReportMetaHandler.GetReportMetasBySchool(cokoDb.Schools.Find(User.Identity.Name), new SchoolReportFileNameOffline());

                appCache.AddReportMetas(model, User.Identity.Name);
            }
            return View(model);
        }
        
        public ActionResult GetOnlineReportsPV(string _schoolID)            
        {
            var model = appCache.GetReportMetas(_schoolID);
            if (model == null)
            {
                model = ReportMetaHandler.GetReportMetasBySchool(cokoDb.Schools.Find(_schoolID), new SchoolReportFileNameOffline());
                appCache.AddReportMetas(model, _schoolID);
            }
            return PartialView("_OnlineReports", model);            
        }
                               
    }
}