using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    [Authorize(Roles = "school, area, rsur-particip")]
    public class RsurController : Controller
    {
        // GET: Angular
        public ActionResult Spa()
        {
            return View();
        }
    }
}