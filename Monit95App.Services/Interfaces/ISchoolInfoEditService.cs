using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface ISchoolInfoEditService
    {
        bool AddNameCorrection(string name, string schoolId);
        bool DeleteNameCorrection(string schoolId);
        bool UpdateField(Action<Domain.Core.School> setProperty, string schoolId);
    }
}
