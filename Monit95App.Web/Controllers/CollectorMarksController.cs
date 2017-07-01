using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.DTO;
using Monit95App.Domain.DTO.Interfaces;
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
        private IParticipService _projectParticipV2Service;

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
        
    }
}