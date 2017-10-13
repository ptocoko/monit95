using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize(Roles = "area")]
    [RoutePrefix("api/RsurMarks")]
    public class RsurMarksController : ApiController
    {
        private readonly IRsurMarksService _rsurMarksService;
        private readonly CokoContext _context;

        public RsurMarksController(IRsurMarksService rsurMarksService, CokoContext context)
        {
            _rsurMarksService = rsurMarksService;
            _context = context;
        }

        [HttpGet]
        [Route("~/api/RsurMarks/{participTestId:int}")]
        public IHttpActionResult Get()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["participTestId"]);
            var result = _rsurMarksService.GetByParticipTestId(participTestId);

            if(result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("~/api/RsurMarks/GetByTestId/{rsurTestId:int}")]
        public IHttpActionResult GetByTestId()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var areaCode = int.Parse(User.Identity.Name);
            var rsurTestId = Convert.ToInt32(RequestContext.RouteData.Values["rsurTestId"]);
            var rsurParticips = _rsurMarksService.GetByAreaCodeAndRsurTestId(areaCode, rsurTestId);

            if(rsurParticips != null)
            {
                return Ok(rsurParticips);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("Post")]
        public IHttpActionResult Post([FromBody]RsurPostMarksDto marksDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var isTestOpen = _context.RsurParticipTests.Single(x => x.Id == marksDto.ParticipTestId).RsurTest.IsOpen;
            if (!isTestOpen) return BadRequest("Редактирование результатов для данного теста закрыто!");

            _rsurMarksService.AddOrUpdateMarks(marksDto.ParticipTestId, marksDto.Marks);

            return Ok();
        }

        [HttpPut]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Put([FromBody]RsurPutMarksDto marksDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var rsurParticipTestId = Convert.ToInt32(RequestContext.RouteData.Values["rsurParticipTestId"]);

            var isTestOpen = _context.RsurParticipTests.Single(x => x.Id == rsurParticipTestId).RsurTest.IsOpen;
            if (!isTestOpen) return BadRequest("Редактирование результатов для данного теста закрыто!");

            _rsurMarksService.AddOrUpdateMarks(rsurParticipTestId, marksDto.Marks);

            return Ok();
        }
    }
}