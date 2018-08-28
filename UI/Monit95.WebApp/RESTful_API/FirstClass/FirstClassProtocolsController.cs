using Monit95App.Services.FirstClass.Protocols;
using Monit95App.Services.OneTwoThree.QuestionProtocol;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API.FirstClass
{
    [RoutePrefix("api/firstclass/protocols"), Authorize(Roles = "school")]
    public class FirstClassProtocolsController : ApiController
    {
        private readonly ProtocolService protocolService;
        private readonly int projectTestId = 2043;

        public FirstClassProtocolsController(ProtocolService protocolService)
        {
            this.protocolService = protocolService;
        }

        [HttpGet, Route("")]
        public IHttpActionResult GetProtocols()
        {
            var schoolId = User.Identity.Name;

            var protocols = protocolService.GetProtocols(schoolId, projectTestId);

            return Ok(protocols);
        }

        //[HttpGet, Route("~/api/onetwothree/protocol/{participTestId}")]
        //public IHttpActionResult Get([FromUri]int participTestId)
        //{
        //    var schoolId = User.Identity.Name;

        //    QuestionProtocolDto protocol;
        //    try
        //    {
        //        protocol = protocolService.GetProtocol(participTestId, schoolId);
        //    }
        //    catch (ArgumentException e)
        //    {
        //        return BadRequest(e.Message);
        //    }

        //    return Ok(protocol);
        //}

        //[HttpPost, Route("{participTestId}")]
        //public IHttpActionResult EditProtocol([FromUri]int participTestId, [FromBody]IEnumerable<QuestionMarkDto> questionMarks)
        //{
        //    var schoolId = User.Identity.Name;

        //    try
        //    {
        //        protocolService.EditQuestionMarks(participTestId, schoolId, questionMarks);
        //    }
        //    catch (ArgumentException e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //    catch (DbUpdateException)
        //    {
        //        return BadRequest();
        //    }

        //    return Ok();
        //}

        [HttpPut, Route("{participTestId}/markAsAbsent")]
        public IHttpActionResult MarkAsAbsent([FromUri]int participTestId)
        {
            try
            {
                protocolService.MarkAsAbsent(participTestId);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }
    }
}