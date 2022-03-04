using System.Web.Mvc;

namespace Monit95App.Controllers
{
    [Authorize(Roles = "school, area, rsur-particip, coko-director")]
    public class RsurController : Controller
    {
        // GET: Angular
        public ActionResult Spa()
        {
            return View();
        }
    }
}