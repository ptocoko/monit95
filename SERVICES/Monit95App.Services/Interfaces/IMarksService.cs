using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Services.DTOs;

namespace Monit95App.Services.Interfaces
{
    public interface IMarksService
    {
        void Add(MarksDto dto);
        IEnumerable<ParticipMarksDto> GetParticipMarksDtos(int projectTestId, string schoolId);
    }
}
