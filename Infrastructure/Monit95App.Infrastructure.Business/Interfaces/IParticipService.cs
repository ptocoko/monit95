using Monit95App.Domain.Core;
using Monit95App.Domain.DTO;
using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface IParticipService
    {
        Task<ParticipModel> AddAsync(ParticipModel dto);                //C
        Task<List<ParticipModel>> GetBySchoolIdAsync(string schoolId);//R
        Task<ParticipModel> GetByParticipIdAsync(int participId);
        Task<bool> UpdateAsync(ParticipModel dto);                    //U
        Task<bool> DeleteAsync(int id);                             //D
    }
}
