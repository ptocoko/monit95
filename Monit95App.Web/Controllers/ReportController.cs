using System.Data.Entity;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Monit95App.Models;
using System.Web.UI;
using Monit95App.Services.Work.Concrete;

namespace Monit95App.Controllers
{
    [Authorize]
    public class ReportController : Controller
    {        
        private readonly cokoContext cokoDb = new cokoContext();        
        private readonly AppCache appCache = new AppCache();
        private readonly ReportMetaHandler onlineReportHandler = new ReportMetaHandler(new SchoolReportFileNameOffline());

        [HttpPost]
        public void AddReportDownload(string _schoolId)
        {

        }

        public ReportController()
        {            
        }
        
        [HttpGet]
        public ActionResult Report()
        {
            var model = appCache.GetOnlineReports(User.Identity.Name);
            if (model == null)
            {
                model = onlineReportHandler.GetOnlineReports(cokoDb.Schools.Find(User.Identity.Name));
                appCache.AddOnlineReports(model, User.Identity.Name);
            }
            return View(model);
        }
        
        public ActionResult GetOnlineReportsPV(string _schoolID)            
        {
            var model = appCache.GetOnlineReports(_schoolID);
            if (model == null)
            {
                model = onlineReportHandler.GetOnlineReports(cokoDb.Schools.Find(_schoolID));
                appCache.AddOnlineReports(model, _schoolID);
            }
            return PartialView("_OnlineReports", model);            
        }
                               
    }
}