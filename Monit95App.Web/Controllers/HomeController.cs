using System.Web.Mvc;
using Monit95App.ViewModels.Home;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Web.UI;
using Monit95App.Domain.Core;
using Monit95App.Web;
using Monit95App.Web.Models;
using Monit95App.Models;

namespace Monit95App.Controllers
{
    //Некоторые части необходи установить атрибуты
    public class HomeController : Controller
    {
        private readonly cokoContext _context = new cokoContext();             

        public HomeController()
        {
     
        }

        [Authorize(Roles = "coko")]
        public ActionResult Corrections()
        {
            var vm = CorrectionModelCreator.CreateModels(_context);
            return View(vm);
        }

        [Authorize(Roles = "coko")]
        public ActionResult Schools()
        {
            var areaNames = new List<SelectListItem>();
            var vm = new SchoolsVM();

           var areas = _context.Areas.ToList();
            //поместить из БД area в List<SelectListItem> areaNames
            areas.ForEach(x =>
            {
                areaNames.Add(new SelectListItem { Text = x.Code + " - " + x.Name, Value = x.Code.ToString() });
            });

            vm.AreaNames = areaNames;
            return View(vm);

        }

        [Authorize(Roles = "coko")]
        [HttpPost]
        public ActionResult GetSchools(string areaIdStr)
        {
            int areaIdInt;
            var schoolNames = new List<SelectListItem>();
            if (!string.IsNullOrEmpty(areaIdStr))
            {
                areaIdInt = Convert.ToInt32(areaIdStr);                
                var schools = _context.Schools.Where(x => x.AreaCode == areaIdInt).ToList();
                schools.ForEach(x =>
                {
                    schoolNames.Add(new SelectListItem { Text = x.Id + " - " + x.Name, Value = x.Id.ToString() });
                });
            }
   
            return Json(schoolNames, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "coko")]
        public ActionResult GetSchoolinfoPV(string schoolId)
        {
            var currentSchool = _context.Schools.Find(schoolId);
            var vm = SchoolModelCreator.CreateFullVersion(currentSchool, _context);
            return PartialView("_Schoolinfo", vm);
        }

        [Authorize(Roles = "school")]
        public ActionResult Schoolinfo()
        {                                       
            var currentSchool = _context.Schools.Find(User.Identity.Name);
            var vm = SchoolModelCreator.CreateFullVersion(currentSchool, _context);
            return View(vm);
        }

        [ChildActionOnly]
        public ActionResult GetFooter()
        {
            if (Session["footer"] == null)
                Session["footer"] = _context.Schools.Find(User.Identity.Name);

            School school = (School)Session["footer"];

            string userInfo = $@"{school.AreaCode}-{school.Id} {school.Name}";

            var vm = new FooterVM(userInfo);

            return View("_PartialFooter", vm);
        }

        public ActionResult Index()
        {
            if (!Request.IsAuthenticated)
            {
                return View("Index", "~/Views/Shared/_GuestLayout.cshtml");
            }
            
            return View();
        }                                   

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
           return View();
        }

        public ActionResult Contact()
        {            
            return View();
        }
        
    }
}