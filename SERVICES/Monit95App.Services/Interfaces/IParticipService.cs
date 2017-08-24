using Monit95App.Domain.Core;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Services.DTOs;

namespace Monit95App.Services.Interfaces
{
    public interface IParticipService
    {
        int Add(ParticipDto dto);
        IEnumerable<ParticipDto> GetAllDtos(int? areaCode, string schoolId);
        ParticipDto GetById(int participId);
        void Update(int id, ParticipDto dto);                    
        bool Delete(int id);                             
    }
}
