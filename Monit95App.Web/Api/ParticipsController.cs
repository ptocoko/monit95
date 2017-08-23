using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System.Security.Claims;

namespace Monit95App.Api
{
    [RoutePrefix("api/particips")]
    [Authorize]
    public class ParticipsController : ApiController
    {
        #region Dependencies

        private readonly IParticipService _participService;

        #endregion    

        public ParticipsController(IParticipService participService)
        {
            _participService = participService;
        }

        #region APIs

        [HttpPost]
        [Route("")]
        public IHttpActionResult Post([FromBody]ParticipDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = _participService.Add(dto);

            return Ok(id);
        }
        
        [HttpGet]
        public IHttpActionResult GetAll(string schoolId = null) //bySchoolId
        {
            //var user = User.Identity.Name;
            //var roles = ((ClaimsIdentity)User.Identity).Claims
            //        .Where(c => c.Type == ClaimTypes.Role)
            //        .Select(c => c.Value);

            return Ok();
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get()
        {
            var id = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            ParticipDto dto;
            try
            {
                dto = _participService.GetById(id);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }            

            return Ok(dto);
        }

        //delete
        public HttpResponseMessage Delete(int id)
        {
            if (id == 0)
            {
                throw new ArgumentNullException("async Task<HttpResponseMessage> Delete(int id)");
            }
            _participService.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPut]
        public HttpResponseMessage Update(ParticipDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException("async Task<HttpResponseMessage> Update(ProjectParticipV2Dto dto)");
            }
                
            try
            {
                _participService.Update(dto);
            }
            catch (ArgumentNullException)
            {
                Request.CreateResponse(HttpStatusCode.Conflict);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        #endregion
    }
}
