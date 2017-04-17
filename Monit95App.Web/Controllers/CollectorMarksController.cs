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

        public CollectorMarksController()
        {
            var unitOfWork = new UnitOfWorkV2(new cokoContext());

            var projectParticipV2Repository = new Repository<ProjectParticipsV2>(unitOfWork);
            var classRepository = new Repository<Class>(unitOfWork);

            var classService = new ClassService(unitOfWork, classRepository);
            _projectParticipV2Service = new ProjectParticipV2Service(unitOfWork, projectParticipV2Repository, classService);
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
        public ContentResult PostParticip(ProjectParticipV2Dto model)
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
        
    }
}