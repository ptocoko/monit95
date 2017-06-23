using Monit95App.Services.Rsur;
using Monit95App.Services.Rsur.Interfaces;
using Monit95App.Services.Rsur.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize]
    public class ParticipEditController : ApiController
    {
        private IParticipEditService _participEditService;

        public ParticipEditController(IParticipEditService particiEditService)
        {
            _participEditService = particiEditService;
        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody]ParticipEditModel model)
        {
            if(!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось внести изменения");                
            }

            _participEditService.AddModel(model);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }
    }
}
