using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.Particips
{
    public interface IParticipService
    {
        IEnumerable<Particip> GetParticips(string schoolId);
        Particip GetParticip(int Id, string schoolId);
    }
}
