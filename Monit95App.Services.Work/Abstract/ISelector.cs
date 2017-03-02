using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Abstract
{
    public interface ISelector
    {
        IEnumerable<ProjectTestDTO> GetOpenProjectTestForArea(int projectCode, int areaCode, string schoolId);
    }
}
