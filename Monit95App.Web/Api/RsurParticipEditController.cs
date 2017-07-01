using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize]
    public class RsurParticipEditController : ApiController
    {
        private IRsurParticipEditService _participEditService;

        public RsurParticipEditController(IRsurParticipEditService particiEditService)
        {
            _participEditService = particiEditService;
        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody]RsurParticipEditModel model)
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
