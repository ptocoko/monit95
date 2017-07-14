using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface IRsurReportModelWriter
    {
        Stream Write(RsurReportModel model);
    }
}
