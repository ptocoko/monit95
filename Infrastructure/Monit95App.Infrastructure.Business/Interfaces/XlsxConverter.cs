using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Business.Models;
using Monit95App.Infrastructure.Business.Interfaces.Rsur;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public class XlsxConverter : IRsurReportModelWriter
    {
        public Stream Write(RsurReportModel model)
        {
            throw new NotImplementedException();
        }
    }
}
