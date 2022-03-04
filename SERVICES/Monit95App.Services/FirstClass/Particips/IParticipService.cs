using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public interface IParticipService
    {
        Task<ParticipList> GetParticips(string schoolId, int projectId, GetAllOptions options);
        Task<ParticipGetDto> GetParticip(int Id, string schoolId);
        Task EditParticip(int Id, string schoolId, ParticipPostDto particip);
        Task CreateParticip(string schoolId, int projectId, ParticipPostDto particip);
        Task RemoveParticip(int Id, string schoolId);
    }
}
