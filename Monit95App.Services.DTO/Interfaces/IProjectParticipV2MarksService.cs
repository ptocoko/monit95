using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO.Interfaces
{
    public interface IProjectParticipV2MarksService
    {
        Task<List<ProjectParticipV2MarksDto>> GetBySchoolAndTestIdAsync(string schoolId, Guid testId);
        Task<bool> AddAsync(ProjectParticipV2MarksDto marks);
        Task<bool> UpdateAsync(ProjectParticipV2MarksDto marks);
    }
}
