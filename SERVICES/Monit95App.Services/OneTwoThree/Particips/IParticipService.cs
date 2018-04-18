using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.Particips
{
    public interface IParticipService
    {
        IEnumerable<ParticipDto> GetParticips(string schoolId);
        ParticipDto GetParticip(int Id, string schoolId);
        void EditParticip(int Id, string schoolId, ParticipDto particip);
        void CreateParticip(string schoolId, ParticipDto particip);
        void RemoveParticip(int Id, string schoolId);
    }
}
