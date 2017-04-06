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
        public ContentResult PostData(IEnumerable<StudentViewModel> model)
        {
            if (model != null)
            {
                var studentModel = model;
                return Content("success");
            }
            else
            {
                return Content("error");
            }
        }
    }
}