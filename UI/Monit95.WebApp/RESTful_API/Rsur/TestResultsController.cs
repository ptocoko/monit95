using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Monit95App.Services.Rsur.TestResult;

namespace Monit95.WebApp.RESTful_API.Rsur
{
    /// <inheritdoc />
    /// <summary>
    /// Контроллер по работа с протоколами проверки заданий участника
    /// </summary>
    [Authorize(Roles = "area")]
    [RoutePrefix("api/rsur/testResults")]
    public class TestResultsController : ApiController
    {
        private readonly IQuestionValueService testResultService;

        public TestResultsController(IQuestionValueService testResultService)
        {
            this.testResultService = testResultService;
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post([FromBody]QuestionValueEditDto testResultDto)
        {
            var areaCode = int.Parse(User.Identity.Name);
            var result = testResultService.CreateOrUpdate(testResultDto, areaCode);

            if (!result.Errors.Any())
            {
                return Request.CreateResponse(HttpStatusCode.Created);
            }

            foreach (var error in result.Errors)
            {
                this.ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);
        }

        [HttpPut]
        [Route("{participCode:int}")]
        public HttpResponseMessage Put([FromBody]QuestionValueEditDto testResultDto)
        {
            var participCode = Convert.ToInt32(RequestContext.RouteData.Values["participCode"]);
            var areaCode = int.Parse(User.Identity.Name);
            var result = testResultService.CreateOrUpdate(testResultDto, areaCode);

            if (!result.Errors.Any())
            {
                return Request.CreateResponse(HttpStatusCode.Created);
            }

            foreach (var error in result.Errors)
            {
                this.ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);            
        }

        /// <summary>
        /// Получает протокол проверки заданий участника. Поиск идет среди текущих отрытых тестов
        /// </summary>
        /// <returns>
        /// The <see cref="IHttpActionResult"/>.
        /// </returns>
        [HttpGet]
        [Route("{participCode:int}")]
        public IHttpActionResult GetOne()
        {
            var participCode = int.Parse(RequestContext.RouteData.Values["participCode"].ToString());
            var areaCode = int.Parse(User.Identity.Name);

            QuestionValueEditDto marksProtocol;
            try
            {
                marksProtocol = this.testResultService.Get(participCode, areaCode);
            }
            catch (System.ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(marksProtocol);
        }

        /// <summary>
        /// Получить список бланков ответов (протоколов проверки заданий) открытых блоков
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            var areaCode = Convert.ToInt32(User.Identity.Name);
            var result = testResultService.GetQuestionProtocolList(areaCode);

            // Success
            if (!result.Errors.Any())
                return Ok(result.Result);

            // Error: another
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            return BadRequest(ModelState);
        }

        [HttpPut]
        [Route("{participTestId:int}/markAsAbsent")]
        public IHttpActionResult MarkAsAbsent()
        {
            var participTestId = int.Parse(RequestContext.RouteData.Values["participTestId"].ToString());
            var areaCode = int.Parse(User.Identity.Name);

            var result = testResultService.MarkAsAbsent(participTestId, areaCode);

            if (!result.Errors.Any())
            {
                return Ok();
            }

            foreach (var error in result.Errors)
            {
                this.ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            }
            return BadRequest(this.ModelState);
        }
    }
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

//[HttpPut]
//[Route("{rsurParticipTestId:int}")]
//public IHttpActionResult Put([FromBody]RsurPutMarksDto marksDto)
//{
//    //if (!ModelState.IsValid)
//    //{
//    //    return BadRequest(ModelState);
//    //}

//    //var rsurParticipTestId = Convert.ToInt32(RequestContext.RouteData.Values["rsurParticipTestId"]);

//    //var isTestOpen = _context.RsurParticipTests.Single(x => x.Id == rsurParticipTestId).RsurTest.IsOpen; //аналогично методу POST
//    //if (!isTestOpen) return Conflict();

//    //var rsurParticipArea = _context.RsurParticipTests.Single(x => x.Id == rsurParticipTestId).RsurParticip.School.AreaCode;
//    //if (User.Identity.Name != rsurParticipArea.ToString()) return Conflict();

//    //marksProtocolService.AddOrUpdateMarks(rsurParticipTestId, marksDto.Marks);

//    return Ok();
//}