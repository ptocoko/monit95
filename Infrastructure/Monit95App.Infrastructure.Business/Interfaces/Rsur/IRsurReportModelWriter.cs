using Monit95App.Infrastructure.Business.Models;
using Monit95App.Infrastructure.Business.Models.Rsur;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces.Rsur
{
    public interface IRsurReportModelWriter
    {
        Stream Write(RsurReportModel model);
    }
}
