using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.ItakeEge.Participant;
using ServiceResult.Exceptions;

namespace Monit95.WebApp.RESTful_API.iTakeEge
{
    /// <inheritdoc />
    /// <summary>
    /// «Я сдам ЕГЭ!». Участники
    /// </summary>
    [RoutePrefix("api/particips")]
    [Authorize(Roles = "school")]
    public class ParticipsController : ApiController
    {
        #region Fields

        private const int ItakeEgeProjectId = 12;

        #endregion

        #region Dependencies

        private readonly IParticipService participService;
        private readonly CokoContext cokoContext;

        #endregion    

        public ParticipsController(IParticipService participService, CokoContext cokoContext)
        {
            this.participService = participService;
            this.cokoContext = cokoContext;
        }

        #region APIs

        /// <summary>
        /// Добавления участника "Я сдам ЕГЭ!"
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]        
        public IHttpActionResult Add([FromBody]ParticipPostOrPutDto dto)
        {
            if (!ModelState.IsValid)            
                return BadRequest(ModelState);                                  

            var schoolId = User.Identity.Name;
            const string dataSource = "school";
            int createdParticipId;
            try
            {
                createdParticipId = participService.Add(dto, schoolId, dataSource);
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
        [HttpGet]
        [Authorize(Roles = "area, school")]
        public IHttpActionResult GetAllParticipants()
        {
            IEnumerable<ParticipGetViewDto> viewDtos;

            if (User.IsInRole("area"))
            {
                var areaCode = Convert.ToInt32(User.Identity.Name);
                viewDtos = participService.GetAllParticipantsByArea(areaCode);
            }
            else
            {
                var schoolId = User.Identity.Name;
                viewDtos = participService.GetAllParticipantsByArea(projectId, areaCode, schoolId);
            }
                                                                                      
            return Ok(viewDtos);
        }        
        

        [HttpPut]
        [Authorize(Roles = "school")]
        [Route("{id:int}")]
        public IHttpActionResult Put([FromBody]ParticipPostOrPutDto dto)
        {
            if (!ModelState.IsValid)            
                return BadRequest(ModelState);

            var participId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            var schoolId = User.Identity.Name;
            if (!cokoContext.Particips.Any(p => p.Id == participId && p.SchoolId == schoolId))
                return BadRequest("participId is invalid or user has not access");                           

            var id = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            try
            {
                participService.Update(id, dto);
            }
            catch(ArgumentException)
            {
                return NotFound();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        
        #endregion
    }
}
