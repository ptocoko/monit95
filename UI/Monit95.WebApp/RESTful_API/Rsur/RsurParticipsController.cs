using System;
using System.Linq;
using System.Web.Http;

using Microsoft.AspNet.Identity;

using Monit95App.Services.Interfaces;

// ReSharper disable StyleCop.SA1126

// ReSharper disable once CheckNamespace
namespace Monit95App.Web.Api
{
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Rsur.Particip;

    [Authorize]
    [RoutePrefix("api/RsurParticips")]
    public class RsurParticipsController : ApiController
    {
        #region Dependencies

        private readonly IRsurParticipService _rsurParticipService;              

        #endregion

        public RsurParticipsController(IRsurParticipService rsurParticipService)
        {
            _rsurParticipService = rsurParticipService;
        }

        #region APIs 

        [HttpPost]
        [Authorize(Roles = "school")]
        public IHttpActionResult Post([FromBody]ParticipAddDto dto)
        {
            //dto.SchoolId = User.Identity.Name;

            //if (!ModelState.IsValid)
            //{
            //    return this.BadRequest(ModelState);
            //}

            //var rsurParticipCode = this._rsurParticipService.Add(dto);

            //return Ok(rsurParticipCode);
            return Ok();
        }

        [HttpGet]
        [Route("")]
        [Authorize(Roles = "coko, area, school")]
        public IHttpActionResult Get(int? areaCode = null, string schoolId = null)
        {
            var userName = User.Identity.GetUserName();
            if (User.IsInRole("area"))
            {
                areaCode = Convert.ToInt32(userName.Substring(0, 3));
            }

            if (User.IsInRole("school"))
            {
                schoolId = userName;
            }

            var dtos = this._rsurParticipService.GetAll(areaCode, schoolId).ToList();            

            if (User.IsInRole("area")
                && dtos.Any(x => x.AreaCodeWithName.Substring(0, 3) != userName.Substring(0, 3)))
            {
                return this.Conflict();
            }         

            if (User.IsInRole("school")
                && dtos.Any(x => x.SchoolIdWithName.Substring(0, 4) != userName))
            {
                return this.Conflict();
            }
                              
            return Ok(dtos);
        }

        [HttpPut]
        [Authorize(Roles = "coko")]
        [Route("{code:int}")]
        public IHttpActionResult Put([FromBody] RsurParticipPutDto dto)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest();
            }

            var code = Convert.ToInt32(RequestContext.RouteData.Values["code"]);

            this._rsurParticipService.Update(code, dto);

            return this.Ok();
        }

        //[HttpDelete]
        //[Authorize(Roles = "school")]
        //[Route("{code:int}")]
        //public IHttpActionResult Delete()
        //{
        //    var code = Convert.ToInt32(RequestContext.RouteData.Values["code"]);

        //    this._rsurParticipService.Delete(code);

        //    return this.Ok();
        //}


        //[HttpGet]
        //[Route("{ParticipCode}")]
        //public HttpResponseMessage GetByParticipCode()
        //{
        //    var participCode = RequestContext.RouteData.Values["ParticipCode"].ToString();   

        //    var fullInfo = _rsurParticipService.GetByParticipCode(participCode);

        //    return fullInfo == null ? Request.CreateErrorResponse(HttpStatusCode.NotFound, "Не удалось найти участника с данным кодом") : 
        //                               Request.CreateResponse(HttpStatusCode.OK, fullInfo);
        //}

        //[HttpGet]
        //[Route("")]
        //[CacheOutput(ClientTimeSpan = 100)]                            
        //public IHttpActionResult Get() // get all participates who access for authorized user
        //{
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

        // return Ok();
        //}

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
