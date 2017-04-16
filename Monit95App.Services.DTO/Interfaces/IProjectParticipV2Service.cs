using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO.Interfaces
{
    public interface IProjectParticipV2Service
    {
        void Add(ProjectParticipV2Dto item);
        Task DeleteAsync(ProjectParticipV2Dto item);

        Task<List<ProjectParticipV2Dto>> GetBySchoolIdAsync(string schoolId);
    }
}
