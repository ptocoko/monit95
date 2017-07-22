using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.School
{
    public interface ISchoolService
    {
        SchoolModel GetModel(string id);
    }
}
