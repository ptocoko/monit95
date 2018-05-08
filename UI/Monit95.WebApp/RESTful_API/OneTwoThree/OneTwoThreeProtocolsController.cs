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
    [RoutePrefix("api/onetwothree/protocols")]
    public class OneTwoThreeProtocolsController : ApiController
    {
        private readonly IQuestionProtocolService protocolService;

        public OneTwoThreeProtocolsController(IQuestionProtocolService protocolService)
        {
            this.protocolService = protocolService;
        }

        [HttpGet, Route("{numberCode}")]
        public IHttpActionResult GetProtocols([FromUri]string numberCode)
        {
            var schoolId = "0005";

            var protocols = protocolService.GetQuestionListDtos(schoolId, numberCode);

            return Ok(protocols);
        }

        [HttpGet, Route("~/api/onetwothree/protocol/{participTestId}")]
        public IHttpActionResult Get([FromUri]int participTestId)
        {
            var schoolId = "0005";

            QuestionProtocolDto protocol = new QuestionProtocolDto
            {
                ParticipFIO = "Эсамбаев Хусайн Арбиевич",
                QuestionMarks = new List<QuestionMarkDto>
                {
                    new QuestionMarkDto
                    {
                        Name = "1",
                        MaxMark = 1,
                        QuestionId = 17
                    },
                    new QuestionMarkDto
                    {
                        Name = "2",
                        MaxMark = 2,
                        QuestionId = 18
                    },
                    new QuestionMarkDto
                    {
                        Name = "3",
                        MaxMark = 3,
                        QuestionId = 19
                    },
                    new QuestionMarkDto
                    {
                        Name = "4",
                        MaxMark = 4,
                        QuestionId = 20
                    }
                }
            };
            //try
            //{
            //    protocol = protocolService.GetProtocol(participTestId, schoolId);
            //}
            //catch (ArgumentException e)
            //{
            //    return BadRequest(e.Message);
            //}

            return Ok(protocol);
        }

        [HttpPost, Route("{participTestId}")]
        public IHttpActionResult EditProtocol([FromUri]int participTestId, [FromBody]IEnumerable<QuestionMarkDto> questionMarks)
        {
            var schoolId = "0005";

            //try
            //{
            //    protocolService.EditQuestionMarks(participTestId, schoolId, questionMarks);
            //}
            //catch(ArgumentException e)
            //{
            //    return BadRequest(e.Message);
            //}
            //catch (DbUpdateException)
            //{
            //    return BadRequest();
            //}

            return Ok();
        }

        [HttpPut, Route("{participTestId}/markAsAbsent")]
        public IHttpActionResult MarkAsAbsent([FromUri]int participTestId)
        {
            var schoolId = "0005";

            //try
            //{
            //    protocolService.MarkAsAbsent(participTestId, schoolId);
            //}
            //catch(ArgumentException e)
            //{
            //    return BadRequest(e.Message);
            //}

            return Ok();
        }
    }
}