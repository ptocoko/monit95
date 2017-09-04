using System;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Net;
using System.Web.Http;

using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;

// ReSharper disable CheckNamespace
namespace Monit95App.Web.Api
{
    [RoutePrefix("api/particips")]
    [Authorize]
    public class ParticipsController : ApiController
    {
        #region Dependencies

        private readonly IParticipService _participService;
        private readonly IGenericRepository<Particip> _participRepository;

        #endregion    

        public ParticipsController(IParticipService participService, IGenericRepository<Particip> participRepository)
        {
            _participService = participService;
            _participRepository = participRepository;
        }

        #region APIs

        [HttpPost]
        public IHttpActionResult Post([FromBody]ParticipDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int id;
            try
            {
                id = _participService.Add(dto);
            }
            catch (DbUpdateException ex)
            {
                var sqlException = ex.GetBaseException() as SqlException;
                if (sqlException != null && (sqlException.Number == 2601 || sqlException.Number == 2627))
                {
                    return Conflict();
                }
                return InternalServerError(ex);
            }

            return Ok(id);
        }

        [HttpGet]
        [Authorize(Roles = "coko, area, school")]
        public IHttpActionResult GetAll(int projectId)
        {
            int? areaCode = null;
            string schoolId = null;

            if (User.IsInRole("area"))
            {
                areaCode = Convert.ToInt32(User.Identity.Name);
            }
            
            if (User.IsInRole("school"))
            {
                schoolId = User.Identity.Name;
            }

            var dtos = _participService.GetAll(projectId, areaCode, schoolId);

            return Ok(dtos);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get()
        {
            var id = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            ParticipDto dto;
            try
            {
                dto = _participService.GetById(id);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }

            return Ok(dto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete()
        {
            var id = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            try
            {
                _participRepository.Delete(id);
            }
            catch(ArgumentException)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "school")]
        [Route("{id:int}")]
        public IHttpActionResult Put([FromBody]ParticipDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            try
            {
                _participService.Update(id, dto);
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
