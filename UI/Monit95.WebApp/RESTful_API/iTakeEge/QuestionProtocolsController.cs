using Monit95App.Services.ItakeEge.QuestionProtocol;
using Monit95App.Services.ItakeEge.QuestionResult;
using Monit95App.Services.QuestionResult.ITakeEgeDtos;
using System;
using System.Collections.Generic;
using System.Web.Http;

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
        [HttpPost, Route("api/participTests/{id}/questionProtocols")]
        public IHttpActionResult PostProtocol([FromBody]IEnumerable<QuestionMarkPostDto> postDtos)
        {
            var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            var schoolId = User.Identity.Name;

            questionProtocolService.Create(schoolId, participTestId, postDtos);
            
            return Ok();
        }

        /// <summary>
        /// Получить протоколы проверки заданий для чтения
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("")]
        public IHttpActionResult GetReadDtos()
        {
            var schoolId = User.Identity.Name;

            IEnumerable<QuestionProtocolReadDto> readDtos = questionProtocolService.GetReadDtos(schoolId);

            return Ok(readDtos);
        }

        /// <summary>
        /// Получение протокола проверки заданий для редактирования
        /// </summary>
        /// <param name="participTestId"></param>
        /// <returns></returns>
        /// TODO: ref
        [HttpGet]
        public IHttpActionResult GetEditDto(int participTestId)
        {
            var schoolId = User.Identity.Name;
            var editDto = questionProtocolService.GetEditDto(schoolId, participTestId);

            return Ok(editDto);
        }

        #endregion
    }
}
