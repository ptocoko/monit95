using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Monit95App.Services.FirstClass.Dtos;
using ServiceResult.Exceptions;

namespace Monit95.WebApp.RESTful_API.FirstClass
{
    [RoutePrefix("api/firstclass/particips"), Authorize(Roles = "school")]
    public class FirstClassParticipsController : ApiController
    {
        private readonly IParticipService participService;
        private readonly int _projectId = 29;

        public FirstClassParticipsController(IParticipService participService)
        {
            this.participService = participService;
        }
        
        [HttpGet, Route("")]
        public IHttpActionResult Get([FromUri]GetAllOptions options)
        {
            string schoolId = User.Identity.Name;
            ParticipList dto;

            try
            {
                dto = participService.GetParticips(schoolId, _projectId, options);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(dto);
            //return BadRequest();
        }

        [HttpGet, Route("{participId:int}")]
        public IHttpActionResult Get(int participId)
        {
            string schoolId = User.Identity.Name;
            ParticipGetDto dto;
            try
            {
                dto = participService.GetParticip(participId, schoolId);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }

            return Ok(dto);
            //return BadRequest();
        }

        [HttpPut, Route("{participId:int}")]
        public IHttpActionResult Put(int participId, [FromBody]ParticipPostDto particip)
        {
            string schoolId = User.Identity.Name;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                participService.EditParticip(participId, schoolId, particip);
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
            //return BadRequest();
        }

        [HttpPost, Route("")]
        public IHttpActionResult Post([FromBody]ParticipPostDto particip)
        {
            string schoolId = User.Identity.Name;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                participService.CreateParticip(schoolId, _projectId, particip);
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
            //return BadRequest();
        }

        [HttpDelete, Route("{participId:int}")]
        public IHttpActionResult Delete(int participId)
        {
            string schoolId = User.Identity.Name;

            try
            {
                participService.RemoveParticip(participId, schoolId);
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
            //return BadRequest();
        }
    }
}