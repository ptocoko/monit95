﻿using Monit95App.Domain.Core;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IParticipService
    {
        int Add(ParticipDto dto);
        IEnumerable<ParticipDto> GetBySchoolId(string schoolId);
        ParticipDto GetById(int participId);
        bool Update(ParticipDto dto);                    
        bool Delete(int id);                             
    }
}
