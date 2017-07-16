using Monit95App.Services.Interfaces.Rsur;
using Monit95App.Services.Models.Rsur;
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
    [System.Web.Http.Authorize(Roles ="coko")]
    public class RsurParticipEditController : ApiController
    {
        private IRsurParticipEditService _participEditService;

        public RsurParticipEditController(IRsurParticipEditService particiEditService)
        {
            _participEditService = particiEditService;
        }
        
        public async Task<HttpResponseMessage> Get()
        {
            var models = await Task.Run(() => _participEditService.GetModels());

            if (models == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Коррекции отсутствуют");
            else
                return Request.CreateResponse(HttpStatusCode.OK, models);
        }
           
        [System.Web.Http.HttpPost]
        public async Task<HttpResponseMessage> Post([Bind(Include ="ParticipCode,NewParticipSurname,NewParticipName,NewParticipSecondName")]RsurParticipEditModel model)
        {
            if(!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");                
            }

            var isAdded = await Task.Run(() => _participEditService.AddModel(model));

            if (isAdded)
                return Request.CreateResponse(HttpStatusCode.Created);
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось добавить коррекцию");
        }

        [System.Web.Http.HttpDelete]
        public async Task<HttpResponseMessage> Cancel(string participCode)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось отменить коррекцию");
            }

            var isDeleted = await Task.Run(() => _participEditService.DeleteModel(participCode));
        
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
