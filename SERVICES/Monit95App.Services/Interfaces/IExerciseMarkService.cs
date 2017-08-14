using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IExerciseMarkService
    {
        Task<ExerciseMarkModel> AddAsync(ExerciseMarkModel dto);
        Task<List<ExerciseMarkModel>> GetBySchoolIdAsync(string schoolId, string[] tests);
        Task<bool> UpdateAsync(ExerciseMarkModel marks);
        Task<List<MaxRatesDto>> GetMaxRates(string[] testIds);
    }
}
