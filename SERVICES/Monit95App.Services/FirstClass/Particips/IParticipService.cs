using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Particips
{
    public interface IParticipService
    {
        ParticipList GetParticips(string schoolId, int projectId, GetAllOptions options);
        ParticipDto GetParticip(int Id, string schoolId);
        void EditParticip(int Id, string schoolId, ParticipDto particip);
        void CreateParticip(string schoolId, int projectId, ParticipDto particip);
        void RemoveParticip(int Id, string schoolId);
    }
}
