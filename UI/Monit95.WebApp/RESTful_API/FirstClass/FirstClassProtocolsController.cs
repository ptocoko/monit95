using Monit95App.Services.FirstClass.Dtos;
using Monit95App.Services.FirstClass.Protocols;
using Monit95App.Services.OneTwoThree.QuestionProtocol;
using ServiceResult.Exceptions;
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

        [HttpGet, Route("{participTestId}")]
        public IHttpActionResult Get([FromUri]int participTestId)
        {
            ProtocolPostDto protocol;
            try
            {
                protocol = protocolService.GetEditProtocol(participTestId);
            }
            catch (EntityNotFoundOrAccessException e)
            {
                return BadRequest(e.Message);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(protocol);
        }

        [HttpPost, Route("{participTestId}")]
        public IHttpActionResult EditProtocol([FromUri]int participTestId, [FromBody]ProtocolPostDto protocolPost)
        {
            try
            {
                protocolService.EditProtocol(protocolPost);
            }
            catch (EntityNotFoundOrAccessException)
            {
                return BadRequest("неверный ключ запроса");
            }
            catch (MarksParseException e)
            {
                return BadRequest(e.Message);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
            catch (DbUpdateException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }

        [HttpPut, Route("{participTestId}/markAsAbsent")]
        public IHttpActionResult MarkAsAbsent([FromUri]int participTestId)
        {
            try
            {
                protocolService.MarkAsAbsent(participTestId);
            }
            catch (EntityNotFoundOrAccessException)
            {
                return BadRequest("неверный ключ запроса");
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }
    }
}