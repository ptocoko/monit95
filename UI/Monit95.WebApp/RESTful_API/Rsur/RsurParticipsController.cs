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
    using Monit95App.Services.Rsur;
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
            return BadRequest();
        }

        [HttpGet]
        [Route("")]
        [Authorize(Roles = "coko, area, school")]
        public IHttpActionResult Get(int? areaCode = null, string schoolId = null)
        {
            var userName = User.Identity.GetUserName();
            if (User.IsInRole("area"))
            {                
                areaCode = Convert.ToInt32(userName.Substring(0, 3)); // e.g. 201->201, 201coko->201
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
                && dtos.Any(x => x.SchoolParticipInfo.SchoolName.Substring(0, 4) != userName))
            {
                return this.Conflict();
            }
                              
            return Ok(dtos);
        }

        [HttpGet]
        [Route("search")]
        public IHttpActionResult Search([FromUri]SearchOptions options)
        {
            var dtos = _rsurParticipService.Search(options);

            return Ok(dtos);
        }

        [HttpPut]
        [Authorize(Roles = "coko, school")]
        [Route("{code:int}")]
        public IHttpActionResult Put([FromUri]int code, [FromBody] RsurParticipPutDto dto)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(ModelState);
            }

            this._rsurParticipService.Update(code, dto);

            return Ok();
        }
        #endregion
    }
}
