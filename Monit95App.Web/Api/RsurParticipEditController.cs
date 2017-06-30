using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace Monit95App.Api
{
    [System.Web.Http.Authorize]
    public class RsurParticipEditController : ApiController
    {
        private IRsurParticipEditService _participEditService;

        public RsurParticipEditController(IRsurParticipEditService particiEditService)
        {
            _participEditService = particiEditService;
        }

        public async Task<List<RsurParticipEditModel>> Get()
        {
            return await Task.Run(() => _participEditService.GetModels());
        }

        [System.Web.Http.HttpPost]
        public HttpResponseMessage Post([Bind(Include ="ParticipCode,NewParticipSurname,NewParticipName,NewParticipSecondName")]RsurParticipEditModel model)
        {
            if(!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось внести изменения");                
            }

            _participEditService.AddModel(model);
            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [System.Web.Http.HttpDelete]
        public HttpResponseMessage Cancel(string participCode)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось отменить коррекцию");
            }

            _participEditService.DeleteModel(participCode);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
