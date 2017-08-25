using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Services.DTOs;

namespace Monit95App.Services.Interfaces
{
    public interface IClassParticipConverter
    {
        ParticipDto ConvertToParticipDto(ClassParticip classParticip, string schoolId, int projectCode);
        IList<ParticipDto> ConvertToParticipDto(IList<ClassParticip> classParticips, string schoolId, int projectCode);
    }
}
