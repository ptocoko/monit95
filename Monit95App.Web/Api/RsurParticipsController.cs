using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Rsur;
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

        [HttpGet]
        [Route("{ParticipCode}")]
        public HttpResponseMessage GetByParticipCode()
        {
            var participCode = RequestContext.RouteData.Values["ParticipCode"].ToString();   
                
            var fullInfo = _rsurParticipService.GetByParticipCode(participCode);

            return fullInfo == null ? Request.CreateErrorResponse(HttpStatusCode.NotFound, "Не удалось найти участника с данным кодом") : 
                                       Request.CreateResponse(HttpStatusCode.OK, fullInfo);
        }

        [HttpGet]
        [Route("")]
        [CacheOutput(ClientTimeSpan = 100)]                            
        public IHttpActionResult Get() //get all participates who access for authorized user
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
            
            var baseInfoList = _rsurParticipService.Get(paramAreaCode, paramSchoolId);

            return Ok(baseInfoList);
        }

        [HttpPut]        
        [Route(@"{ParticipCode:regex(^2016-2\d{2}-\d{3})}")]
        public IHttpActionResult Put([FromBody]RsurParticipFullInfo fullInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var authorizedUserModel = _userService.GetModel(User.Identity.GetUserId());
            var participCode = RequestContext.RouteData.Values["ParticipCode"].ToString();     
            
            bool isAdmin = authorizedUserModel.UserName == "coko";
            if (authorizedUserModel.UserRoleNames.Single() == "area")
            {
                var entity = _rsurParticipService.GetEntity(participCode);
                if (entity == null)
                {
                    return NotFound();
                }
                if (entity.School.AreaCode.ToString() != authorizedUserModel.UserName)
                {
                    return new StatusCodeResult(HttpStatusCode.Forbidden, new HttpRequestMessage());
                }
            }
            if (authorizedUserModel.UserRoleNames.Single() == "school")
            {
                if(fullInfo.SchoolIdWithName.Substring(0, 4) != authorizedUserModel.UserName)
                {
                    return new StatusCodeResult(HttpStatusCode.Forbidden, new HttpRequestMessage());
                }
            }

            var updatedRsurParticipFullInfo = _rsurParticipService.Update(fullInfo, isAdmin);

            return Ok(updatedRsurParticipFullInfo);
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
