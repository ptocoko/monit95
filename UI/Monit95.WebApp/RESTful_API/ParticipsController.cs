using Monit95App.Services.ItakeEge.Participant;
using ServiceResult.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API
{
    [Authorize(Roles = "school"), RoutePrefix("api/particips")]
    public class ParticipsController : ApiController
    {
        private readonly IParticipService participService;

        public ParticipsController(IParticipService participService)
        {
            this.participService = participService;
        }

        [HttpGet, Route("{projectId:int}")]
        public IHttpActionResult GetAll([FromUri] int projectId)
        {
            var schoolId = User.Identity.Name;
            var dtos = participService.GetAllParticipantsBySchool(schoolId, projectId);
            return Ok(dtos);
        }

        // GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<controller>
        [HttpPost, Route("{projectId:int}")]
        public IHttpActionResult Post([FromBody]ParticipPostOrPutDto postOrPutDto, [FromUri]int projectId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var schoolId = User.Identity.Name;
            const string dataSource = "school";
            int createdParticipId;
            try
            {
                createdParticipId = participService.Add(postOrPutDto, schoolId, dataSource, projectId);
            }
            catch (DublicateEntityException)
            {
                return Conflict();
            }

            return ResponseMessage(Request.CreateResponse(HttpStatusCode.Created, createdParticipId));
        }

        // PUT api/<controller>/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/<controller>/5
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var schoolId = User.Identity.Name;

            try
            {
                participService.Delete(id, schoolId);
            }
            catch (EntityNotFoundOrAccessException)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}