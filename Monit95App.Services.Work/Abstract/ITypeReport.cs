using Monit95App.Domain.Work.Concrete;
using Monit95App.Services.Work.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Work.Abstract
{
    public interface ITypeReport
    {
        IEnumerable<ReportMeta> GetReportMetas();
    }
}
