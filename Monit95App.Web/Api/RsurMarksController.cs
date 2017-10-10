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

        public RsurMarksController(IRsurMarksService rsurMarksService)
        {
            _rsurMarksService = rsurMarksService;
        }

        [HttpGet]
        public IHttpActionResult Get(int participTestId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

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
        public IHttpActionResult Post([FromBody]RsurPostMarksDto marksDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _rsurMarksService.AddOrUpdateMarks(marksDto.RsurParticipTestId, marksDto.Marks);

            return Ok();
        }

        [HttpPut]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Put([FromBody]RsurPutMarksDto marksDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var rsurParticipTestId = Convert.ToInt32(RequestContext.RouteData.Values["rsurParticipTestId"]);
            _rsurMarksService.AddOrUpdateMarks(rsurParticipTestId, marksDto.Marks);

            return Ok();
        }

        [HttpGet]
        public IHttpActionResult GetValueOfFilling(int rsurTestId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var areaCode = int.Parse(User.Identity.Name);
            var value = _rsurMarksService.GetValueOfFilling(rsurTestId, areaCode);

            return Ok(value);
        }
    }
}