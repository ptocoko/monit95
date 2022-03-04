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
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API.FirstClass
{
    [RoutePrefix("api/firstclass/protocols"), Authorize(Roles = "school")]
    public class FirstClassProtocolsController : ApiController
    {
        private readonly ProtocolService protocolService;
        private readonly int projectTestId = 3123;
        private readonly string year = "2020";

        public FirstClassProtocolsController(ProtocolService protocolService)
        {
            this.protocolService = protocolService;
        }

        [HttpGet, Route("")]
        public async Task<IHttpActionResult> GetProtocols([FromUri]ListGetOptions options)
        {
            var schoolId = User.Identity.Name;
            ProtocolsList dto;

            try
            {
                dto = await protocolService.GetProtocols(schoolId, projectTestId, options);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(dto);
            //return BadRequest();
        }

        [HttpGet, Route("{participTestId}")]
        public async Task<IHttpActionResult> Get([FromUri]int participTestId)
        {
            ProtocolPostDto protocol;
            try
            {
                protocol = await protocolService.GetEditProtocol(participTestId, year);
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
            //return BadRequest();
        }

        [HttpPost, Route("{participTestId}")]
        public async Task<IHttpActionResult> EditProtocol([FromUri]int participTestId, [FromBody]ProtocolPostDto protocolPost)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await protocolService.EditProtocol(protocolPost);
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

            return Ok("OK");
            //return BadRequest();
        }

        [HttpPut, Route("{participTestId}/markAsAbsent")]
        public async Task<IHttpActionResult> MarkAsAbsent([FromUri]int participTestId)
        {
            try
            {
                await protocolService.MarkAsAbsent(participTestId);
            }
            catch (EntityNotFoundOrAccessException)
            {
                return BadRequest("неверный ключ запроса");
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }

            return Ok("Ok");
            //return BadRequest();
        }
    }
}