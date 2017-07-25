using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Models;
using Monit95App.Services.Interfaces.Rsur;
using Monit95App.Services.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApi.OutputCache.V2;

namespace Monit95App.Api
{    
    [Authorize]
    [RoutePrefix("api/RsurParticips")]
    public class RsurParticipsController : ApiController
    {
        #region Fileds

        private readonly IRsurParticipService _rsurParticipService;

        #endregion
        public RsurParticipsController(IRsurParticipService rsurParticipService)
        {
            _rsurParticipService = rsurParticipService;
        }

        #region Api

        [HttpPatch]
        [Route("{ParticipCode}")]
        public async Task<HttpResponseMessage> Patch([FromBody] JsonPatchDocument<RsurParticipBaseInfo> baseInfo)
        {
            //model.App
            return new HttpResponseMessage();
        }

        [HttpGet]
        [Route("{participCode}")]
        public async Task<HttpResponseMessage> Get(string participCode)
        {
            if (participCode == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");

            RsurParticipBaseInfo resultModel = await Task.Run(() => _rsurParticipService.GetByParticipCode(participCode));

            if (resultModel == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Не удалось найти участника с данным кодом");
            else
                return Request.CreateResponse(HttpStatusCode.OK, resultModel);
        }

        [HttpGet]
        [Route("")]
        [CacheOutput(ClientTimeSpan = 100)]                          
        public HttpResponseMessage Get()
        {
            var _dbContext = new ApplicationDbContext();
            var user = _dbContext.Users.Find(User.Identity.GetUserId());
            var userName = User.Identity.Name;
            var userRoles = user.Roles.Select(x => x.Role.Name).Single();            
            
            var models = _rsurParticipService.GetByUserName(userName, userRoles);

            if (models == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Не удалось найти участников");
            else
                return Request.CreateResponse(HttpStatusCode.OK, models);
        }

        [HttpPut]        
        [Route("{id}")]
        public HttpResponseMessage PutParticip([FromBody]RsurParticipBaseInfo model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Неверный запрос");
            }

            _rsurParticipService.Update(model);

            return Request.CreateResponse(HttpStatusCode.OK, "Ресурс успешно обновлен");
        }

        [HttpGet]
        [Route("api/RsurParticips/GetParticipResults/{participCode}")]
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

        #endregion
    }
}
