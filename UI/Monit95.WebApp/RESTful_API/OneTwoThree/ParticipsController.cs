using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Monit95App.Services.OneTwoThree.Particips;
using ServiceResult.Exceptions;

namespace Monit95.WebApp.RESTful_API.OneTwoThree
{
    [RoutePrefix("api/onetwothree/particips")]//, Authorize(Roles = "school")]
    public class OneTwoThreeParticipsController : ApiController
    {
        private readonly IParticipService participService;

        public OneTwoThreeParticipsController(IParticipService participService)
        {
            this.participService = participService;
        }
        
        [HttpGet, Route("")]
        public IHttpActionResult Get([FromUri]GetAllOptions options)
        {
            //string schoolId = User.Identity.Name;
            ParticipList dto;

            try
            { 
                dto = participService.GetParticips("0005", options);
            }
            catch(ArgumentNullException)
            {
                return BadRequest();
            }

            return Ok(dto);
        }

        [HttpGet, Route("{participId:int}")]
        public IHttpActionResult Get(int participId)
        {
            string schoolId = User.Identity.Name;
            ParticipDto dto;
            try
            {
                dto = participService.GetParticip(participId, schoolId);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }

            return Ok(dto);
        }

        [HttpPut, Route("{participId:int}")]
        public IHttpActionResult Put(int participId, [FromBody]ParticipDto particip)
        {
            string schoolId = User.Identity.Name;
            try
            {
                participService.EditParticip(participId, schoolId, particip);
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException)
            {
                return Conflict();
            }

            return Ok();
        }

        [HttpPost, Route("")]
        public IHttpActionResult Post([FromBody]ParticipDto particip)
        {
            string schoolId = User.Identity.Name;
            try
            {
                participService.CreateParticip(schoolId, particip);
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException)
            {
                return Conflict();
            }

            return Ok();
        }

        [HttpDelete, Route("{participId:int}")]
        public IHttpActionResult Delete(int participId)
        {
            string schoolId = User.Identity.Name;
            try
            {
                participService.RemoveParticip(participId, schoolId);
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}