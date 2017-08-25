using Monit95App.Domain.Core;
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
    public class ExerciseMarksController : ApiController
    {
        #region Dependencies

        private readonly IExerciseMarkService _exerciseMarksService;

        #endregion

        public ExerciseMarksController(IExerciseMarkService exerciseMarkService)
        {
            _exerciseMarksService = exerciseMarkService;
        }

        //public async Task<IEnumerable<ExerciseMarkDto>> GetMarksBySchoolId(string id)
        //{
        //    if (!string.IsNullOrEmpty(id))
        //    {
        //        return await _exerciseMarksService.GetBySchoolIdAsync(id, OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.CHT));
        //    }
        //    return null;
        //}

        public IHttpActionResult Post([FromBody]ExerciseMarkDto dto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var id = _exerciseMarksService.Add(dto);

            return Ok(id);
        }

        //[HttpPut]
        //public async Task<HttpResponseMessage> Update(ExerciseMarkDto dto)
        //{
        //    if (dto == null) return Request.CreateResponse(HttpStatusCode.BadRequest);

        //    await _exerciseMarksService.UpdateAsync(dto);
        //    return Request.CreateResponse(HttpStatusCode.OK);                  
        //}

        //public async Task<List<MaxRatesDto>> GetMaxRates()
        //{
        //    return await _exerciseMarksService.GetMaxRates(OneTwoThreeTestsKeeper.GetTestIds(OneTwoThreeTestAlias.CHT));
        //}
    }
}
