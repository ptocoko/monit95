using Monit95App.Infrastructure.Data;
using System.Web.Mvc;
using Monit95App.Models;
using Monit95App.Services;
using Monit95App.Services.SchoolFiles;

namespace Monit95App.Controllers
{
    [Authorize(Roles = "school")]
    public class ReportController : Controller
    {
        //private readonly CokoContext cokoDb;
        private readonly IReportMetaHandler reportMetaHandler;
        private readonly AppCache appCache = new AppCache();        

        public ReportController(IReportMetaHandler reportMetaHandler)
        {
            //cokoDb = cokoContext;
            this.reportMetaHandler = reportMetaHandler;
        }

        //public ReportController()
        //{
        //    cokoDb = new CokoContext();
        //}

        [HttpGet]
        public ActionResult Report()
        {
            var model = appCache.GetReportMetas(User.Identity.Name);
            if (model == null)
            {
                model = reportMetaHandler.GetReportMetasBySchool(User.Identity.Name, new SchoolReportFileNameOffline());

                appCache.AddReportMetas(model, User.Identity.Name);
            }
            return View(model);
        }
        
        public ActionResult GetOnlineReportsPV(string _schoolID)            
        {
            var model = appCache.GetReportMetas(_schoolID);
            if (model == null)
            {
                model = reportMetaHandler.GetReportMetasBySchool(_schoolID, new SchoolReportFileNameOffline());
                appCache.AddReportMetas(model, _schoolID);
            }
            return PartialView("_OnlineReports", model);            
        }
                               
    }
}