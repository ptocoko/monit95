using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTO;
using Monit95App.Services.DTO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{
    public class ExerciseMarksController : ApiController
    {
        IExerciseMarkService _exerciseMarksService;

        public ExerciseMarksController()
        {
            var unitOfWork = new UnitOfWorkV2(new cokoContext());
            var exerciseMarksRepository = new Repository<ExerciseMark>(unitOfWork);
            _exerciseMarksService = new ExerciseMarkService(unitOfWork, exerciseMarksRepository);
        }

        public async Task<IEnumerable<ExerciseMarkDto>> GetMarksBySchoolId(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                return await _exerciseMarksService.GetBySchoolIdAsync(id);
            }
            else
            {
                return null;
            }
        }

        public async Task<ExerciseMarkDto> Post(ExerciseMarkDto dto)
        {
            if(dto != null)
            {
                return await _exerciseMarksService.AddAsync(dto);
            }
            else
            {
                return null;
            }
        }

        [HttpPut]
        public async Task<HttpResponseMessage> Update(ExerciseMarkDto dto)
        {
            if(dto != null)
            {
                await _exerciseMarksService.UpdateAsync(dto);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}
