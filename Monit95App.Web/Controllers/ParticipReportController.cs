using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    public class ParticipReportController : Controller
    {
        static string reportFolder = @"\\192.168.88.220\файлы_пто\nsur_reports";
        // GET: ParticipReport
        public ActionResult Index()
        {
            return new HttpNotFoundResult();
        }

        public FileResult GetReport(string testId, string participCode)
        {
            if (!ModelState.IsValid) throw new ArgumentException();

            string filePath = $@"{reportFolder}\{testId}\{participCode}.pdf";
            string fileType = "application/pdf";
            string fileName = $"{participCode}.pdf";

            var result = File(filePath, fileType, fileName);

            return result;
        }
    }
}