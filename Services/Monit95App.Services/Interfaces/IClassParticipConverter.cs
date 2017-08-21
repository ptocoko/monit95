using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IClassParticipConverter
    {
        ParticipDto ConvertToParticipDto(ClassParticip classParticip);
    }
}
