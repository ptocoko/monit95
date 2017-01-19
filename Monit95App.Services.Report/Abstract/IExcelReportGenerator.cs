using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Report.Abstract
{
    public interface IExcelReportGenerator
    {
        void Generated(ParticipReportModel model);
    }
}
