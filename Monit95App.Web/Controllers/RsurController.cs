using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    [Authorize(Roles = "school")] //TODO: изменить если проект будет требовать
    public class RsurController : Controller
    {
        // GET: Angular
        public ActionResult Spa()
        {
            return View();
        }
    }
}