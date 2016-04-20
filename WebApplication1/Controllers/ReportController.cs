using monit95App.Domain.Core;
using monit95App.Domain.Interfaces;
using monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    public class ReportController : Controller
    {
        private IReportRepository reportRepository;
        
        public ReportController()
        {
            this.reportRepository = new ReportRepository(new monit95Context());
        }


        // GET: Report
        public ActionResult Index()
        {
            return View();
        }
    }
}