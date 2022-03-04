using Monit95App.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95.WebApp.Controllers
{
    [Authorize(Roles = "school")]
    public class VectorOfRiseController : Controller {
        // GET: VectorOfRise
        public ActionResult Index()
        {
            return View();
        }
    }
}