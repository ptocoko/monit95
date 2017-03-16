using Monit95App.Domain.Core;
using Monit95App.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Abstract
{
    public interface IParticipTestService
    {
        void AddDto(ParticipTestDTO dto);
        ParticipTestDTO GetDto(ParticipTest item);
    }
}
