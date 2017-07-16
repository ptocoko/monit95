using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize]
    public class ExerciseMarksController : ApiController
    {
        private readonly IExerciseMarkService _exerciseMarksService;

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

        public async Task<ExerciseMarkModel> Post(ExerciseMarkModel model)
        {
            if (model != null)
            {
                return await _exerciseMarksService.AddAsync(model);
            }
            return null;
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
