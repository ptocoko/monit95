using Monit95App.Domain.Core;
using Monit95App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    public class CollectorController : Controller
    {
        private cokoContext context;

        public CollectorController()
        {
            context = new cokoContext();
        }
        // GET: Collector
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetCollect()
        {
            return View();
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

    }
}