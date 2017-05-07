using System.Web.Mvc;
using Monit95App.ViewModels.Home;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Web.UI;
using Monit95App.Domain.Core;

namespace Monit95App.Controllers
{
    //Некоторые части необходи установить атрибуты
    public class HomeController : Controller
    {
        private readonly cokoContext _context = new cokoContext();        

        [OutputCache(Duration=1800, Location = OutputCacheLocation.Client, VaryByParam = "subjectCode")]
        public JsonResult GetAllParticips(int subjectCode)
        {            
            var participInfos = new List<LearnerVM>();
            foreach (var result in _context.GiaResults.Where(x=>x.ProjectCode==201676 && x.SubjectCode == subjectCode))
            {
                participInfos.Add(new LearnerVM
                {
                    Id = result.ParticipCode,
                    SchoolId = result.SchoolId,
                    Learner = new Learner
                    {
                        Surname = result.Surname,
                        Name = result.Name,
                        SecondName = string.IsNullOrEmpty(result.SecondName) ? string.Empty : result.SecondName
                    },
                    AreaIdWithName = $"{result.School.AreaCode} - {result.School.Area.Name}",
                    SchoolIdWithName = $"{result.SchoolId} - {result.School.Name}"
                });
            }
            var jsonResult = Json(participInfos, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult GetCollectorSchoolInfos(int collectorId = 201650)
        {
            var collectorSchools = new List<CollectorSchoolInfo>();
            var schools = _context.CollectorSchools.Where(x => x.CollectorId == collectorId)
                                                   .Select(x => new
                                                   {
                                                       x.School,
                                                       x.StatusCode
                                                   }).Distinct().ToList();
            schools.ForEach(x =>
            collectorSchools.Add(new CollectorSchoolInfo
            {
                schoolBaseInfo = CreatorSchoolInfo.CreateBaseVersion(x.School),
                StatusName = x.StatusCode == 0 ? "не загруженно" : "загруженно"
            })
            );
            return Json(collectorSchools, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Oge2016()
        {
            return View();
        }

        public HomeController()
        {
     
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
            var vm = CreatorSchoolInfo.CreateFullVersion(currentSchool);
            return PartialView("_Schoolinfo", vm);
        }

        [Authorize(Roles = "school")]
        public ActionResult Schoolinfo()
        {                                       
            var currentSchool = _context.Schools.Find(User.Identity.Name);
            var vm = CreatorSchoolInfo.CreateFullVersion(currentSchool);
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

//public EmptyResult MergeReport(int _param)
//{
//    //...
//    System.Diagnostics.Debug.WriteLine("MergeReport start! " + _param);
//    return new EmptyResult();
//}

//public string AjaxTester()
//{
//    if (Request.IsAjaxRequest())
//    {
//        return DateTime.Now.ToString();
//    }
//    else
//    {
//        return "FAIL";
//    }
//}