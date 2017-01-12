using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Interfaces
{
    public interface ISchoolBaseInfo
    {
        string Id { get; set; }
        string Name { get; set; }
        string AreaName { get; set; } //areaId - areaname
    }
}
