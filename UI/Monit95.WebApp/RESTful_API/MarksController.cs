using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;

// ReSharper disable once CheckNamespace
namespace Monit95App.Web.Api
{
    [Authorize(Roles = "school")]
    [RoutePrefix("api/Marks")]
    public class MarksController : ApiController
    {
        //#region Dependencies

        //private readonly IMarksService _marksService;
        //private readonly IGenericRepository<Result> _resultRepository;

        //#endregion

        //public MarksController(IMarksService marksService)
        //{
        //    _marksService = marksService;
        //}

        #region  APIs

        [HttpPost]
        public IHttpActionResult Post([FromBody]PostMarksDto dto)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //_marksService.Add(dto);

            return Ok();
        }

        [HttpGet]        
        public IHttpActionResult GetAll(int projectTestId)
        {
            //IEnumerable<ParticipMarksDto> participMarksDtos;
            //try
            //{
            //    participMarksDtos = _marksService.GetParticipMarksDtos(projectTestId, User.Identity.Name).OrderBy(o => o.ClassName).ThenBy(o => o.Surname).ThenBy(o => o.Name);
            //}
            //catch (ArgumentException ex)
            //{
            //    return BadRequest(ex.Message);
            //}            

            //return Ok(participMarksDtos);
            return null;
        }

        [HttpGet]
        public IHttpActionResult GetByParticipTestId(int participTestId)
        {
            //var participMarksDto = _marksService.GetByParticipTestId(participTestId);
            //var Fio = $"{participMarksDto.Surname} {participMarksDto.Name} {participMarksDto.SecondName}";
            //var marksArray = participMarksDto.Marks?.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToArray();

            //return Ok(new {
            //    ParticipTestId = participTestId,
            //    Fio = Fio,
            //    Question1Mark = marksArray?[0],
            //    Question2Mark = marksArray?[1],
            //    Question3Mark = marksArray?[2],
            //    Question4Mark = marksArray?[3],
            //    Question5Mark = marksArray?[4],
            //});
            return null;
        }

        [HttpPut]
        [Route("{participTestId:int}")]
        public IHttpActionResult Put([FromBody]PutMarksDto dto)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["participTestId"]);

            //_marksService.Update(participTestId, dto);

            return Ok();
        }

        [HttpDelete]
        [Route("{participTestId:int}")]
        public IHttpActionResult Delete()
        {
            //var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["participTestId"]);
            //try
            //{
            //    _resultRepository.Delete(participTestId);
            //}
            //catch (ArgumentException)
            //{
            //    return NotFound();
            //}

            return Ok();
        }

        #endregion


    }
}
