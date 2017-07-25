﻿using Microsoft.AspNet.Identity;
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
using Monit95App.Web.Services;
using WebApi.OutputCache.V2;

namespace Monit95App.Api
{    
    [Authorize]
    [RoutePrefix("api/RsurParticips")]
    public class RsurParticipsController : ApiController
    {
        #region Fileds

        private readonly IRsurParticipService _rsurParticipService;
        private readonly IUserService _userService;

        #endregion
        public RsurParticipsController(IRsurParticipService rsurParticipService,
                                       IUserService userService)
        {
            _rsurParticipService = rsurParticipService;
            _userService = userService;
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
        public async Task<IHttpActionResult> GetAsync() //get all participates who access for authorized user
        {
            var authorizedUserModel = _userService.GetModel(User.Identity.GetUserId());
            var authorizedUserName = authorizedUserModel.UserName;
            var authorizedUserRole = authorizedUserModel.UserRoleNames.Single();

            int? paramAreaCode = null;            
            if (authorizedUserRole.Equals("area"))
            {
                paramAreaCode = Convert.ToInt32(authorizedUserName);
            }

            string paramSchoolId = null;
            if (authorizedUserRole.Equals("school"))
            {
                paramSchoolId = authorizedUserName;
            }
            
            var baseInfoList = await _rsurParticipService.GetTask(paramAreaCode, paramSchoolId);

            return Ok(baseInfoList);
        }

        [HttpPut]
        [Route("api/RsurParticips/PutParticip")]
        public async Task<HttpResponseMessage> PutParticip([FromBody]RsurParticipBaseInfo model)
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
