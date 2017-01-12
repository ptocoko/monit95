using Monit95App.Services.Work.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = Microsoft.Office.Interop.Excel;

namespace Monit95App.Services.Work.Abstract
{
    public interface IExportReportToXLSX<U>
        where U : LRmodel
    {
        void ExportSchoolReport(SRmodel<U> report);
    }
}
