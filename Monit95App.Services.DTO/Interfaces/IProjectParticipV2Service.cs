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
        Task<ProjectParticipV2Dto> AddAsync(ProjectParticipV2Dto dto);       //C
        Task<List<ProjectParticipV2Dto>> GetBySchoolIdAsync(string schoolId);//R
        Task<bool> UpdateAsync(ProjectParticipV2Dto dto);                         //U
        Task<bool> DeleteAsync(int id);                                      //D

    }
}
