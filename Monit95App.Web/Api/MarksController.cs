using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Web.Api
{
    [Authorize(Roles = "school")]
    [RoutePrefix("api/marks")]
    public class MarksController : ApiController
    {
        #region Dependencies

        private readonly IMarksService _marksService;
        private readonly IGenericRepository<Result> _resultRepository;

        #endregion

        public MarksController(IMarksService marksService)
        {
            _marksService = marksService;
        }

        #region  APIs

        [HttpPost]
        public IHttpActionResult Post([FromBody]PostMarksDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _marksService.Add(dto);

            return Ok();
        }

        [HttpGet]        
        public IHttpActionResult GetAll(int projectTestId)
        {
            IEnumerable<ParticipMarksDto> participMarksDtos;
            try
            {
                participMarksDtos = _marksService.GetParticipMarksDtos(projectTestId, User.Identity.Name);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }            

            return Ok(participMarksDtos);
        }

        [HttpPut]
        //[Route("{participTestId:int}")]
        public IHttpActionResult Put([FromBody]PostMarksDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["participTestId"]);

            _marksService.Update(dto.ParticipTestId, dto);

            return Ok();
        }

        [HttpDelete]
        [Route("{participTestId:int}")]
        public IHttpActionResult Delete()
        {
            var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["participTestId"]);
            try
            {
                _resultRepository.Delete(participTestId);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }

            return Ok();
        }

        #endregion


    }
}
