using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Business.Interfaces;
using Monit95App.Infrastructure.Business.Models;
using Monit95App.Infrastructure.Data;
using Monit95App.Infrastructure.Data.Interfaces;
using Monit95App.Models;
using Monit95App.Models.Abstarct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{    
    [Authorize]
    public class RsurParticipController : ApiController
    {
        private readonly IRsurParticipService _rsurParticipService;

        public RsurParticipController(IRsurParticipService rsurParticipService)
        {
            _rsurParticipService = rsurParticipService;
        }

        public async Task<HttpResponseMessage> GetByParticipCode(string participCode)
        {
            if (participCode == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");

            RsurParticipModel resultModel = await Task.Run(() => _rsurParticipService.GetByParticipCode(participCode));

            if (resultModel == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Не удалось найти участника с данным кодом");
            else
                return  Request.CreateResponse(HttpStatusCode.OK, resultModel);
        }
       
       [HttpGet]
        public async Task<HttpResponseMessage> GetByUserName(string userName, string userRoles)
        {
            if (userName == null || userRoles == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");

            var models = await Task.Run(() => _rsurParticipService.GetByUserName(userName, userRoles));

            if (models == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Не удалось найти участников");
            else
                return Request.CreateResponse(HttpStatusCode.OK, models);
        }      

        [HttpPut]
        //[Route("api/rsurParticips")]
        public async Task<HttpResponseMessage> PutParticip([FromBody]RsurParticipModel model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Неверный запрос");
            }

            var isUpdated = await Task.Run(() => _rsurParticipService.Update(model));
            if (isUpdated)
                return Request.CreateResponse(HttpStatusCode.OK, "Ресурс успешно обновлен");
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось применить изменения");
        }

        public async Task<HttpResponseMessage> GetParticipResults(string participCode)
        {
            if (participCode == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");

            var results = await Task.Run(() => _rsurParticipService.GetParticipResults(participCode));

            if (results == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Не удалось найти результаты");
            else
                return Request.CreateResponse(HttpStatusCode.OK, results);
        }     
    }
}
