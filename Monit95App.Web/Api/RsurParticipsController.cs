using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

using Microsoft.AspNet.Identity;

using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Rsur;
using Monit95App.Web.Services;

using WebApi.OutputCache.V2;
// ReSharper disable StyleCop.SA1126

// ReSharper disable once CheckNamespace
namespace Monit95App.Web.Api
{
    using Monit95App.Services.DTOs;

    [Authorize]
    [RoutePrefix("api/RsurParticips")]
    public class RsurParticipsController : ApiController
    {
        #region Dependencies

        private readonly IRsurParticipService _rsurParticipService;
        private readonly IUserService _userService;        

        #endregion

        public RsurParticipsController(
            IRsurParticipService rsurParticipService,
            IUserService userService)
        {
            _rsurParticipService = rsurParticipService;
            _userService = userService;            
        }

        #region Api 

        [HttpPost]
        [Authorize(Roles = "school")]
        public IHttpActionResult Post([FromBody]RsurParticipPostDto dto)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(ModelState);
            }

            var code = this._rsurParticipService.Add(dto);

            return Ok();
        }


        //[HttpGet]
        //[Route("{ParticipCode}")]
        //public HttpResponseMessage GetByParticipCode()
        //{
        //    var participCode = RequestContext.RouteData.Values["ParticipCode"].ToString();   
                
        //    var fullInfo = _rsurParticipService.GetByParticipCode(participCode);

        //    return fullInfo == null ? Request.CreateErrorResponse(HttpStatusCode.NotFound, "Не удалось найти участника с данным кодом") : 
        //                               Request.CreateResponse(HttpStatusCode.OK, fullInfo);
        //}

        [HttpGet]
        [Route("")]
        [CacheOutput(ClientTimeSpan = 100)]                            
        public IHttpActionResult Get() // get all participates who access for authorized user
        {
            //var authorizedUserModel = _userService.GetModel(User.Identity.GetUserId());
            //var authorizedUserName = authorizedUserModel.UserName;
            //var authorizedUserRole = authorizedUserModel.UserRoleNames.Single();

            //int? paramAreaCode = null;            
            //if (authorizedUserRole.Equals("area"))
            //{
            //    paramAreaCode = Convert.ToInt32(authorizedUserName);
            //}

            //string paramSchoolId = null;
            //if (authorizedUserRole.Equals("school"))
            //{
            //    paramSchoolId = authorizedUserName;
            //}
            
            //var fullInfoList = _rsurParticipService.Get(paramAreaCode, paramSchoolId);

            return Ok();
        }

        //[HttpPut]        
        //[Route(@"{ParticipCode:regex(^2016-2\d{2}-\d{3})}")]
        //public IHttpActionResult Put([FromBody]RsurParticipFullInfo fullInfo)
        //{
        //    //if (!ModelState.IsValid)
        //    //{
        //    //    return BadRequest(ModelState);
        //    //}

        //    //var authorizedUserModel = _userService.GetModel(User.Identity.GetUserId());
        //    //var routeParticipCode = RequestContext.RouteData.Values["ParticipCode"].ToString();     
            
        //    //if(authorizedUserModel.UserName == "coko")
        //    //{
        //    //    _rsurParticipService.FullUpdate(fullInfo);
        //    //    return Ok();
        //    //}

        //    //if (authorizedUserModel.UserRoleNames.Single() == "area")
        //    //{
        //    //    var entity = _rsurParticipRepository.GetById(routeParticipCode);
        //    //    if (entity == null)
        //    //    {
        //    //        return NotFound();
        //    //    }
        //    //    if (entity.School.AreaCode.ToString() != authorizedUserModel.UserName)
        //    //    {
        //    //        return new StatusCodeResult(HttpStatusCode.Forbidden, new HttpRequestMessage());
        //    //    }                
        //    //}
        //    //if (authorizedUserModel.UserRoleNames.Single() == "school")
        //    //{
        //    //    if(fullInfo.SchoolIdWithName.Substring(0, 4) != authorizedUserModel.UserName)
        //    //    {
        //    //        return new StatusCodeResult(HttpStatusCode.Forbidden, new HttpRequestMessage());
        //    //    }
        //    //}

        //    return Ok();
        //}

        //[HttpGet]
        //[Route("api/RsurParticips/GetParticipResults/{participCode}")]
        //public async Task<HttpResponseMessage> GetParticipResults(string participCode)
        //{
        //    if (participCode == null)
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");

        //    var results = await Task.Run(() => _rsurParticipService.GetParticipResults(participCode));

        //    if (results == null)
        //        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Не удалось найти результаты");
        //    else
        //        return Request.CreateResponse(HttpStatusCode.OK, results);
        //}

        #endregion
    }
}
