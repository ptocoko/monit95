using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Monit95App.Services.Rsur.QuestionValue;
using Monit95App.Services.Rsur.TestResult;
using ServiceResult;

namespace Monit95.WebApp.RESTful_API.Rsur
{
    /// <inheritdoc />
    /// <summary>
    /// Контроллер по работа с протоколами проверки заданий участника
    /// </summary>
    [Authorize(Roles = "area,school")]
    [RoutePrefix("api/rsur/questionValues")]
    public class QuestionValuesController : ApiController
    {
        #region Dependencies

        private readonly IQuestionValueService questionValueService;

        #endregion

        public QuestionValuesController(IQuestionValueService questionValueService)
        {
            this.questionValueService = questionValueService;
        }

        /// <summary>
        /// Добавление баллов по заданиям
        /// </summary>
        /// <param name="questionValueEditDto"></param>
        /// <returns>Не возвращает Id т.к. RsurParticipTests.Id и RsurTestResults.RsurParticipTestId равны</returns>
        [HttpPost]
        [Route("")]
        public async Task<HttpResponseMessage> Post([FromBody]QuestionValueEditDto questionValueEditDto)
        {
            var result = await questionValueService.CreateOrUpdate(questionValueEditDto);

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
        public async Task<HttpResponseMessage> Put([FromBody]QuestionValueEditDto testResultDto)
        {
            // var participCode = Convert.ToInt32(RequestContext.RouteData.Values["participCode"]);
            var result = await questionValueService.CreateOrUpdate(testResultDto);

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
        /// Получает список бланков ответов (протоколов проверки заданий) открытых блоков для отображения в общем окне
        /// </summary>
        /// <returns>
        /// The <see cref="IEnumerable{QuestionValueEditDto}"/>
        /// </returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            ServiceResult<IEnumerable<QuestionValueViewDto>> result;
            if (User.IsInRole("area"))
            {
                var areaCode = Convert.ToInt32(User.Identity.Name);
                result = questionValueService.GetQuestionProtocolList(areaCode);
            }
            else
            {
                var schoolId = User.Identity.Name;
                result = questionValueService.GetQuestionProtocolListForSchool(schoolId);
            }

            // Success
            if (!result.Errors.Any())
                return Ok(result.Result);

            // Error: another
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            return BadRequest(ModelState);
        }

        /// <summary>
        /// Получает протокол проверки заданий участника для заполнения или изменения. Поиск идет среди текущих открытых тестов
        /// </summary>
        /// <returns>
        /// The <see cref="QuestionValueEditDto"/>.
        /// </returns>
        [HttpGet]
        [Route("{participCode:int}")]
        public IHttpActionResult GetEditDtoByParticipCode()
        {
            var participCode = int.Parse(RequestContext.RouteData.Values["participCode"].ToString());

            QuestionValueEditDto marksProtocol;
            try
            {
                marksProtocol = this.questionValueService.Get(participCode);
            }
            catch (System.ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(marksProtocol);
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetEditDtoByFileId(int fileId)
        {
            var areaCode = int.Parse(User.Identity.Name);
            var result = questionValueService.GetEditDtoByFileId(fileId, areaCode);

            // Success
            if (!result.Errors.Any())
                return Ok(result.Result);

            // Error: another
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            return BadRequest(ModelState);
        }
        
        /// <summary>
        /// Указание что участник отсутствовал
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [Route("{participTestId:int}/markAsAbsent")]
        public async Task<IHttpActionResult> MarkAsAbsent()
        {
            var participTestId = int.Parse(RequestContext.RouteData.Values["participTestId"].ToString());

            var result = await questionValueService.MarkAsAbsent(participTestId);

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

        /// <summary>
        /// Возвращает процент заполненных протоколов 
        /// </summary>
        /// <remarks>
        /// Возвращает процент заполненных протоколов от общего числа протоколов (для открытых тестов).        
        /// </remarks>
        /// <returns>Цело число (%)</returns>
        [HttpGet]
        [Route("statistics")]
        public IHttpActionResult GetStatistics()
        {
            ServiceResult<int> result;

            if (User.IsInRole("area"))
            {
                var areaCode = Convert.ToInt32(User.Identity.Name);
                result = questionValueService.GetStatistics(areaCode);
            }
            else
            {
                var schoolId = User.Identity.Name;
                result = questionValueService.GetStatisticsForSchool(schoolId);
            }
            // Success
            if (!result.Errors.Any())
                return Ok(result.Result);

            // Error: another
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            return BadRequest(ModelState);           
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