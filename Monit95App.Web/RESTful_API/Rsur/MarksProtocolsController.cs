using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;

using System.Web.Http;

namespace Monit95App.RESTful_API.Rsur
{
    using Monit95App.Services.Rsur.MarksProtocol;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Net;
    using System.Net.Http;

    /// <summary>
    /// Контроллер по работа с протоколами проверки заданий участника
    /// </summary>
    //[Authorize(Roles = "area")]
    [RoutePrefix("api/rsur/marksProtocols")]
    public class MarksProtocolsController : ApiController
    {
        private readonly IMarksProtocolService marksProtocolService;        

        public MarksProtocolsController(IMarksProtocolService marksProtocolService)
        {
            this.marksProtocolService = marksProtocolService;            
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post([FromBody]MarksProtocol marksProtocol)
        {                       
            var areaCode = int.Parse(User.Identity.Name);
            //var validationResults = marksProtocolService.CreateOrEditRsurTestResultEntity(marksProtocol, areaCode);

            var validationResults = new List<ValidationResult>
            {
                new ValidationResult("some error 1"),
                new ValidationResult("some error 2")
            };

            // если validationResults не пуст значит сервисе произошла какая-то ошибка
            if (validationResults.Any())
            {
                foreach(var validatioResult in validationResults)                
                    ModelState.AddModelError($"{nameof(marksProtocol)}", validatioResult.ErrorMessage);                

                return  Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            return Request.CreateResponse(HttpStatusCode.Created);
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

            MarksProtocol marksProtocol;
            try
            {
                marksProtocol = marksProtocolService.Get(participCode, areaCode);
            }
            catch (System.ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(marksProtocol);
        }
    }
}

