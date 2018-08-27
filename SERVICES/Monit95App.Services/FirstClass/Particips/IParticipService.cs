using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public interface IParticipService
    {
        ParticipList GetParticips(string schoolId, int projectId, GetAllOptions options);
        ParticipGetDto GetParticip(int Id, string schoolId);
        void EditParticip(int Id, string schoolId, ParticipPostDto particip);
        void CreateParticip(string schoolId, int projectId, ParticipPostDto particip);
        void RemoveParticip(int Id, string schoolId);
    }
}
