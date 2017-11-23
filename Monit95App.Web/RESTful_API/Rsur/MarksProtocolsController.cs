using System;
using System.Linq;
using System.Web.Http;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Rsur.MarksProtocol;

namespace Monit95App.RESTful_API.Rsur
{
    /// <summary>
    /// Контроллер по работа с протоколами проверки заданий участника
    /// </summary>
    [Authorize(Roles = "area")]
    [RoutePrefix("api/marksProtocols")]
    public class MarksProtocolsController : ApiController
    {
        private readonly IMarksProtocolService marksProtocolService;
        private readonly CokoContext _context;

        public MarksProtocolsController(IMarksProtocolService marksProtocolService, CokoContext context)
        {
            this.marksProtocolService = marksProtocolService;
            _context = context;
        }        

        [HttpPost]
        [Route("")]
        public IHttpActionResult Post([FromBody]RsurPostMarksDto marksDto)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //var isTestOpen = _context.RsurParticipTests.Single(x => x.Id == marksDto.ParticipTestId).RsurTest.IsOpen; //проверяем открыт ли тест для изменений
            //if (!isTestOpen) return Conflict();

            //var rsurParticipArea = _context.RsurParticipTests.Single(x => x.Id == marksDto.ParticipTestId).RsurParticip.School.AreaCode; //сравниваем код района участника и код района, под которым
            //if (User.Identity.Name != rsurParticipArea.ToString()) return Conflict();                                                    //редактируются данные

            //marksProtocolService.AddOrUpdateMarks(marksDto.ParticipTestId, marksDto.Marks);

            return Ok();
        }

        //[HttpGet]        
        //[Route("{participTestId:int}")]
        //public IHttpActionResult GetOld()
        //{            
        //    var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["participTestId"]);
        //    var result = rsurMarksProtocolService.GetByParticipTestId(participTestId);

        //    if(result != null)
        //    {
        //        return Ok(result);
        //    }
        //    return NotFound();
        //}        

        [HttpPut]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Put([FromBody]RsurPutMarksDto marksDto)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //var rsurParticipTestId = Convert.ToInt32(RequestContext.RouteData.Values["rsurParticipTestId"]);

            //var isTestOpen = _context.RsurParticipTests.Single(x => x.Id == rsurParticipTestId).RsurTest.IsOpen; //аналогично методу POST
            //if (!isTestOpen) return Conflict();

            //var rsurParticipArea = _context.RsurParticipTests.Single(x => x.Id == rsurParticipTestId).RsurParticip.School.AreaCode;
            //if (User.Identity.Name != rsurParticipArea.ToString()) return Conflict();

            //marksProtocolService.AddOrUpdateMarks(rsurParticipTestId, marksDto.Marks);

            return Ok();
        }

        /// <summary>
        /// Получает протокол проверки заданий участника. Поиск идет среди текущих отрытых тестов
        /// </summary>        
        [HttpGet]
        [Route("{participCode:range(10000, 99999)}")]
        public IHttpActionResult Get()
        {
            var participCode = int.Parse(RequestContext.RouteData.Values["participCode"].ToString());
            var areaCode = int.Parse(User.Identity.Name);
            var marksProtocol = marksProtocolService.Get(participCode, areaCode);

            return Ok(marksProtocol);
        }
    }
}