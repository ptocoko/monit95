using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO.Interfaces
{
    public interface IExerciseMarkService
    {
        Task<ExerciseMarkDto> AddAsync(ExerciseMarkDto dto);
        Task<List<ExerciseMarkDto>> GetBySchoolIdAsync(string schoolId, string[] tests);
        Task<bool> UpdateAsync(ExerciseMarkDto marks);
        Task<List<MaxRatesDto>> GetMaxRates(string[] testIds);
    }
}
