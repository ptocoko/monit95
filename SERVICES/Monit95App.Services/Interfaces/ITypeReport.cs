using Monit95App.Services.SchoolFiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface ITypeReport
    {
        IEnumerable<ReportModel> GetReportMetas();
    }
}
