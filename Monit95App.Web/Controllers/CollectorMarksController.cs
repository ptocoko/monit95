using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTO;
using Monit95App.Services.DTO.Interfaces;
using Monit95App.ViewModels.CollectorMarks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Monit95App.Controllers
{
    //TODO: only for school role account
    public class CollectorMarksController : Controller
    {
        private IProjectParticipV2Service _projectParticipV2Service;
        private IClassService _classService;

        public CollectorMarksController()
        {

        }

        // GET: CollectorMarks
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FillParticips()
        {
            return View();
        }

        //TODO: Post particip & Post result
        [HttpPost]
        public ContentResult PostData(ProjectParticipV2Dto model)
        {            
            if (model != null)
            {
                _projectParticipV2Service.Add(model);
                return Content("success");
            }
            else
            {
                return Content("error");
            }
        }        

        public async Task<JsonResult> GetClasses()
        {
            var classes = await Task.Run(() => _classService.GetAll());
            var result = classes.Take(24).Select(s => new { Id = s.Id.Trim(), Name = s.Name.Trim() }).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}