using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Services.DTOs;

namespace Monit95App.Services.Interfaces
{
    public interface IExerciseMarkService
    {
        int Add(ExerciseMarkDto dto);
        Task<List<ExerciseMarkDto>> GetBySchoolIdAsync(string schoolId, string[] tests);
        Task<bool> UpdateAsync(ExerciseMarkDto marks);
        Task<List<MaxRatesDto>> GetMaxRates(string[] testIds);
    }
}
