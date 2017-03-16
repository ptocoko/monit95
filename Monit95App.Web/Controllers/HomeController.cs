using System.Web.Mvc;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.ViewModels.Home;
using System.Collections.Generic;
using Monit95App.Models;
using System.Linq;
using System;
using Newtonsoft.Json;
using Monit95App.Domain.Core;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.UI;

namespace Monit95App.Controllers
{   
    public class HomeController : Controller
    {
        private readonly cokoContext context = new cokoContext();

      //  [OutputCache(Duration=1800, Location = OutputCacheLocation.Client, VaryByParam = "subjectCode")]
        public JsonResult GetAllParticips(int subjectCode)
        {
            List<LearnerVM> participInfos = new List<LearnerVM>();
            foreach (var result in context.oge_16_res.Where(x=>x.SubjectCode == subjectCode))
            {
                participInfos.Add(new LearnerVM
                {
                    Id = result.ParticipId,
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

        public JsonResult GetCollectorSchoolInfos(int _collectorId = 201650)
        {
            List<CollectorSchoolInfo> collectorSchools = new List<CollectorSchoolInfo>();
            var schools = context.CollectorSchools.Where(x => x.CollectorId == _collectorId)
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
            List<SelectListItem> areaNames = new List<SelectListItem>();
            var vm = new SchoolsVM();

            List<Area> areas = context.Areas.ToList();
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
        public ActionResult GetSchools(string areaID_str)
        {
            int areaID_int;
            List<SelectListItem> schoolNames = new List<SelectListItem>();
            if (!string.IsNullOrEmpty(areaID_str))
            {
                areaID_int = Convert.ToInt32(areaID_str);                
                List<School> schools = context.Schools.Where(x => x.AreaCode == areaID_int).ToList();
                schools.ForEach(x =>
                {
                    schoolNames.Add(new SelectListItem { Text = x.Id + " - " + x.Name, Value = x.Id.ToString() });
                });
            }
            //
            //string json = JsonConvert.SerializeObject(schoolNames);
            //System.IO.File.WriteAllText(@"D:\path.json", json);
            //
            return Json(schoolNames, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "coko")]
        public ActionResult GetSchoolinfoPV(string _schoolID)
        {
            var currentSchool = context.Schools.Find(_schoolID);
            var vm = CreatorSchoolInfo.CreateFullVersion(currentSchool);
            return PartialView("_Schoolinfo", vm);
        }

        [Authorize(Roles = "school")]
        public ActionResult Schoolinfo()
        {                                       
            var currentSchool = context.Schools.Find(User.Identity.Name);
            var vm = CreatorSchoolInfo.CreateFullVersion(currentSchool);
            return View(vm);
        }

        [ChildActionOnly]
        public ActionResult GetFooter()
        {
            if (Session["footer"] == null)
                Session["footer"] = context.Schools.Find(User.Identity.Name);

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
         //   return RedirectToAction("Index", "Home");
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