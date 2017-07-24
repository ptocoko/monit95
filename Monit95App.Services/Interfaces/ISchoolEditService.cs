using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface ISchoolEditService
    {
        Task<bool> DeleteEditTask(string schoolId);
        Task<bool> AddEditTask(SchoolsEdit schoolEdit);
    }
}
