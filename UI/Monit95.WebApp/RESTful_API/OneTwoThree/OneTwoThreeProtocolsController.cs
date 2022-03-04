using Monit95App.Services.OneTwoThree.QuestionProtocol;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API.OneTwoThree
{
    [RoutePrefix("api/onetwothree/protocols"), Authorize(Roles = "school")]
    public class OneTwoThreeProtocolsController : ApiController
    {
        private readonly IQuestionProtocolService protocolService;

        public OneTwoThreeProtocolsController(IQuestionProtocolService protocolService)
        {
            this.protocolService = protocolService;
        }

        [HttpGet, Route("{projectTestId}")]
        public IHttpActionResult GetProtocols([FromUri]int projectTestId)
        {
            var schoolId = User.Identity.Name;

            var protocols = protocolService.GetQuestionListDtos(schoolId, projectTestId);

            return Ok(protocols);
        }

        [HttpGet, Route("~/api/onetwothree/protocol/{participTestId}")]
        public IHttpActionResult Get([FromUri]int participTestId)
        {
            var schoolId = User.Identity.Name;

            QuestionProtocolDto protocol;
            try
            {
                protocol = protocolService.GetProtocol(participTestId, schoolId);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(protocol);
        }

        [HttpPost, Route("{participTestId}")]
        public IHttpActionResult EditProtocol([FromUri]int participTestId, [FromBody]QuestionProtocolDto protocolDto)
        {
            var schoolId = User.Identity.Name;

            try
            {
                protocolService.EditQuestionMarks(participTestId, schoolId, protocolDto);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
            catch (DbUpdateException)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut, Route("{participTestId}/markAsAbsent")]
        public IHttpActionResult MarkAsAbsent([FromUri]int participTestId)
        {
            var schoolId = User.Identity.Name;

            try
            {
                protocolService.MarkAsAbsent(participTestId, schoolId);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }
    }
}