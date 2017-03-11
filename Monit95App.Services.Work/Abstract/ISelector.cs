using Monit95App.Domain.Core;
using Monit95App.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Abstract
{
    public interface ISelector
    {
        IEnumerable<ProjectTestDTO> GetOpenProjectTestDTOs(int projectCode, int areaCode, string schoolId);
    }
}
