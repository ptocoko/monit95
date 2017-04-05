using Monit95App.ViewModels.CollectorMarks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    public class CollectorMarksController : Controller
    {
        // GET: CollectorMarks
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ContentResult PostData()
        {
            var schoolId = Request.Form["[\"SchoolId"].Split(new char[] { ',' });

            var surnames = Request.Form["Surname"].Split(new char[] { ',' });
            var names = Request.Form["Name"].Split(new char[] { ',' });
            var classIds = Request.Form["Marks"].Split(new char[] { ',' });
            return Content("success");
        }
    }
}