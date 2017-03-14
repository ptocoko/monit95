using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    [Authorize]
    public class NsurController : Controller
    {
        // GET: Nsur
        public ActionResult Index()
        {
            return View();
        }
    }
}