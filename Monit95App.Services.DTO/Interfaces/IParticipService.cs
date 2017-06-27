using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO.Interfaces
{
    public interface IParticipService
    {
        Task<ParticipDto> AddAsync(ParticipDto dto);                //C
        Task<List<ParticipDto>> GetBySchoolIdAsync(string schoolId);//R
        Task<ParticipDto> GetByParticipIdAsync(int participId);
        Task<bool> UpdateAsync(ParticipDto dto);                    //U
        Task<bool> DeleteAsync(int id);                             //D
    }
}
