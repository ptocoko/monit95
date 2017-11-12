using System;
using System.Linq;
using System.Web.Http;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;

namespace Monit95App.RESTful_API.Rsur
{
    [Authorize(Roles = "area")]
    [RoutePrefix("api/rsurMarks")]
    public class MarksController : ApiController
    {
        private readonly IRsurMarksService _rsurMarksService;
        private readonly CokoContext _context;

        public MarksController(IRsurMarksService rsurMarksService, CokoContext context)
        {
            _rsurMarksService = rsurMarksService;
            _context = context;
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Post([FromBody]RsurPostMarksDto marksDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isTestOpen = _context.RsurParticipTests.Single(x => x.Id == marksDto.ParticipTestId).RsurTest.IsOpen; //проверяем открыт ли тест для изменений
            if (!isTestOpen) return Conflict();

            var rsurParticipArea = _context.RsurParticipTests.Single(x => x.Id == marksDto.ParticipTestId).RsurParticip.School.AreaCode; //сравниваем код района участника и код района, под которым
            if (User.Identity.Name != rsurParticipArea.ToString()) return Conflict();                                                    //редактируются данные

            _rsurMarksService.AddOrUpdateMarks(marksDto.ParticipTestId, marksDto.Marks);

            return Ok();
        }

        [HttpGet]        
        [Route("{participTestId:int}")]
        public IHttpActionResult Get()
        {            
            var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["participTestId"]);
            var result = _rsurMarksService.GetByParticipTestId(participTestId);

            if(result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }        

        [HttpPut]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Put([FromBody]RsurPutMarksDto marksDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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