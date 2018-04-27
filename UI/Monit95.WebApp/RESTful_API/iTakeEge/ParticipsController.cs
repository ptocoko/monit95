using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Monit95App.Services.ItakeEge.Participant;
using ServiceResult.Exceptions;

namespace Monit95.WebApp.RESTful_API.iTakeEge
{
    /// <inheritdoc />
    /// <summary>
    /// «Я сдам ЕГЭ!». Участники
    /// </summary>
    [RoutePrefix("api/iTakeEGE/participants")]
    [Authorize(Roles = "school")]
    public class ParticipsController : ApiController
    {
        #region Dependencies

        private readonly IParticipService participService;        

        #endregion    

        public ParticipsController(IParticipService participService)
        {
            this.participService = participService;            
        }

        #region APIs

        /// <summary>
        /// Добавление участника "Я сдам ЕГЭ!"
        /// </summary>
        /// <param name="postOrPutDto"></param>
        /// <returns></returns>
        [HttpPost, Route("")]        
        public IHttpActionResult AddForEge([FromBody]ParticipPostOrPutDto postOrPutDto, [FromUri]int projectId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);                                  

            var schoolId = User.Identity.Name;
            const string dataSource = "school";
            int createdParticipId;
            try
            {
                createdParticipId = participService.Add(postOrPutDto, schoolId, dataSource, projectId);
            }
            catch (DublicateEntityException)
            {
                return Conflict();
            }
            
            return ResponseMessage(Request.CreateResponse(HttpStatusCode.Created, createdParticipId));            
        }

        /// <summary>
        /// Получить список участников пользователя
        /// </summary>
        /// <remarks>Получить список участников для таблицы, где отображается весь список участников</remarks>
        /// <returns></returns>
        [HttpGet, Route("")]
        public IHttpActionResult GetAllForEge()
        {
            IEnumerable<ParticipGetViewDto> viewDtos;
            const int projectId = 15;
            var schoolId = User.Identity.Name;
            viewDtos = participService.GetAllParticipantsBySchool(schoolId, projectId);
                                                                                      
            return Ok(viewDtos);
        }

        [HttpGet, Route("~/api/oge/participants")]
        public IHttpActionResult GetAllForOge()
        {
            IEnumerable<ParticipGetViewDto> viewDtos;
            const int projectId = 16;
            var schoolId = User.Identity.Name;
            viewDtos = participService.GetAllParticipantsBySchool(schoolId, projectId);

            return Ok(viewDtos);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Put([FromBody]ParticipPostOrPutDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var participId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            var schoolId = User.Identity.Name;

            try
            {
                participService.Update(participId, schoolId, dto);
            }
            catch (EntityNotFoundOrAccessException)
            {
                return NotFound();
            }
            catch (DbUpdateException exception)
            {
                var httpError = new HttpError(exception, true);
                ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.Conflict, httpError));
            }

            return Ok();
        }

        /// <summary>
        /// Удаление участника
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        [Authorize(Roles = "school")]
        [Route("{id:int}")]
        public IHttpActionResult Delete()
        {
            var schoolId = User.Identity.Name;
            var participId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);

            try
            {
                participService.Delete(participId, schoolId);
            }
            catch (EntityNotFoundOrAccessException)
            {
                return NotFound();
            }

            return Ok();
        }

        #endregion
    }
}
