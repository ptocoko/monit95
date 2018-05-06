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
    [RoutePrefix("api/onetwothree/questionprotocols")]
    public class QuestionProtocolsController : ApiController
    {
        private readonly IQuestionProtocolService protocolService;

        public QuestionProtocolsController(IQuestionProtocolService protocolService)
        {
            this.protocolService = protocolService;
        }

        [HttpGet, Route("")]
        public IHttpActionResult GetProtocols()
        {
            var schoolId = "0005";

            var protocols = protocolService.GetQuestionListDtos(schoolId);

            return Ok(protocols);
        }

        [HttpGet, Route("{participTestId}")]
        public IHttpActionResult Get([FromUri]int participTestId)
        {
            var schoolId = "0005";

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
        public IHttpActionResult EditProtocol([FromUri]int participTestId, [FromBody]IEnumerable<QuestionMarkDto> questionMarks)
        {
            var schoolId = "0005";

            try
            {
                protocolService.EditQuestionMarks(participTestId, schoolId, questionMarks);
            }
            catch(ArgumentException e)
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
            var schoolId = "0005";

            try
            {
                protocolService.MarkAsAbsent(participTestId, schoolId);
            }
            catch(ArgumentException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }
    }
}