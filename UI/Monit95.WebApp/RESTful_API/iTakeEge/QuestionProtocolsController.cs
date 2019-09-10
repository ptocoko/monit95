using Monit95App.Services.ItakeEge.QuestionResult;
using Monit95App.Services.QuestionResult.ITakeEgeDtos;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Monit95App.Services.ItakeEge.QuestionProtocol;
using System.Threading.Tasks;

namespace Monit95.WebApp.RESTful_API.iTakeEge
{
    /// <summary>
    /// Контроллер для работы с протоколами проверки заданий
    /// </summary>    
    [Authorize(Roles = "school")]    
    public class QuestionProtocolsController : ApiController
    {
        #region Dependencies

        private readonly IQuestionProtocolService questionProtocolService;

        #endregion

        #region Constructors

        public QuestionProtocolsController(IQuestionProtocolService questionProtocolService)
        {
            this.questionProtocolService = questionProtocolService;
        }

        #endregion

        #region Endpoints

        /// <summary>
        /// Создание протокола проверки заданий.
        /// </summary>
        /// <returns></returns>
        /// <remarks>
        /// Создание протокола проверки заданий происходит, отправкой баллов по заданиям. 
        /// </remarks>
        /// TODO: ref
        [HttpPost, Route("api/iTakeEGE/participTests/{id}/questionProtocols")]
        public async Task<IHttpActionResult> PostProtocol([FromBody]Dictionary<int, double> orderMarkDict)
        {
            var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            var schoolId = User.Identity.Name;

            await questionProtocolService.Create(schoolId, participTestId, orderMarkDict);
            
            return Ok();
        }

        /// <summary>
        /// Получение списка протоколов проверки заданий для чтения
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("api/iTakeEGE/questionProtocols/{projectTestId}")]
        public async Task<IHttpActionResult> GetReadDtos([FromUri]int projectTestId)
        {
            var schoolId = User.Identity.Name;

            IEnumerable<QuestionProtocolReadDto> readDtos = await questionProtocolService.GetReadDtos(schoolId, projectTestId);

            return Ok(readDtos);
        }

        /// <summary>
        /// Получение протокола проверки заданий для заполнения/редактирования
        /// </summary>
        /// <param name="participTestId"></param>
        /// <returns><see cref="QuestionProtocolEditDto"/>></returns>
        /// TODO: ref
        [HttpGet, Route("api/iTakeEGE/questionProtocols")]
        public async Task<IHttpActionResult> GetEditDto(int participTestId)
        {
            var schoolId = User.Identity.Name;
            var editDto = await questionProtocolService.GetEditDto(schoolId, participTestId);

            return Ok(editDto);
        }

        /// <summary>
        /// Отметить участника как отсутствовал
        /// </summary>
        /// <returns></returns>
        [HttpPut, Route("api/iTakeEge/participTests/{id}")]        
        public async Task<IHttpActionResult> MarkAsWasNot()
        {
            var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            var schoolId = User.Identity.Name;

            await questionProtocolService.MarkAsWasNot(schoolId, participTestId);
            return Ok();
        }

        #endregion
    }
}
