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
        Task<List<ExerciseMarkDto>> GetBySchoolIdAndTestIdAsync(string schoolId, string testId);
        Task<bool> UpdateAsync(ExerciseMarkDto marks);
    }
}
