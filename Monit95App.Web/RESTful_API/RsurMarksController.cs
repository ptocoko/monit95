using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using System;
using System.Linq;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize(Roles = "area")]
    [RoutePrefix("api/rsurMarks")]
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
        //[Route("~/api/RsurMarks/{participTestId:int}")]
        [Route("{participTestId:int}")]
        public IHttpActionResult Get()
        {            
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

        [HttpPost]
        [Route("Post")]
        public IHttpActionResult Post([FromBody]RsurPostMarksDto marksDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var isTestOpen = _context.RsurParticipTests.Single(x => x.Id == marksDto.ParticipTestId).RsurTest.IsOpen; //проверяем открыт ли тест для изменений
            if (!isTestOpen) return Conflict();

            var rsurParticipArea = _context.RsurParticipTests.Single(x => x.Id == marksDto.ParticipTestId).RsurParticip.School.AreaCode; //сравниваем код района участника и код района, под которым
            if (User.Identity.Name != rsurParticipArea.ToString()) return Conflict();                                                    //редактируются данные

            _rsurMarksService.AddOrUpdateMarks(marksDto.ParticipTestId, marksDto.Marks);

            return Ok();
        }

        [HttpPut]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Put([FromBody]RsurPutMarksDto marksDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var rsurParticipTestId = Convert.ToInt32(RequestContext.RouteData.Values["rsurParticipTestId"]);

            var isTestOpen = _context.RsurParticipTests.Single(x => x.Id == rsurParticipTestId).RsurTest.IsOpen; //аналогично методу POST
            if (!isTestOpen) return Conflict();

            var rsurParticipArea = _context.RsurParticipTests.Single(x => x.Id == rsurParticipTestId).RsurParticip.School.AreaCode;
            if (User.Identity.Name != rsurParticipArea.ToString()) return Conflict();

            _rsurMarksService.AddOrUpdateMarks(rsurParticipTestId, marksDto.Marks);

            return Ok();
        }
    }
}