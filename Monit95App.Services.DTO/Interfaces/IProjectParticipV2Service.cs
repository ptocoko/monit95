using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO.Interfaces
{
    public interface IProjectParticipV2Service
    {
        void InsertOrUpdate(ProjectParticipV2Dto item);

        IEnumerable<ProjectParticipV2Dto> Get(string schoolId);
    }
}
