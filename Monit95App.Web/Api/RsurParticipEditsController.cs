using Monit95App.Services.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Monit95App.Services.Interfaces;

namespace Monit95App.Api
{
    [Authorize(Roles = "coko")]
    [RoutePrefix("api/RsurParticipEdits")]
    public class RsurParticipEditsController : ApiController
    {
        private readonly IRsurParticipEditService _rsurParticipEditService;

        public RsurParticipEditsController(IRsurParticipEditService particiEditService)
        {
            _rsurParticipEditService = particiEditService;
        }
        
        public async Task<HttpResponseMessage> Get()
        {
            var models = await Task.Run(() => _rsurParticipEditService.GetModels());

            if (models == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Коррекции отсутствуют");
            else
                return Request.CreateResponse(HttpStatusCode.OK, models);
        }
           
        //[System.Web.Http.HttpPost]
        //public async Task<HttpResponseMessage> Post([Bind(Include ="ParticipCode,NewParticipSurname,NewParticipName,NewParticipSecondName")]RsurParticipEditModel model)
        //{
        //    if(!ModelState.IsValid)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");                
        //    }

        //    var isAdded = await Task.Run(() => _participEditService.AddModel(model));

        //    if (isAdded)
        //        return Request.CreateResponse(HttpStatusCode.Created);
        //    else
        //        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось добавить коррекцию");
        //}

        [HttpDelete]
        [Route(@"{ParticipCode:regex(^2016-2\d{2}-\d{3})}")]
        public IHttpActionResult Delete() //Aplly edit 
        {
            var participCode = RequestContext.RouteData.Values["ParticipCode"].ToString();

            try
            {
                _rsurParticipEditService.Apply(participCode);
            }
            catch(ArgumentException)
            {
                return NotFound();
            }
            
            return Ok();
        }
    }
}
