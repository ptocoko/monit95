using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Work.Abstract
{
    public interface ISchoolReportFileNameSource
    {
        IEnumerable<string> GetFileNames(School school); //return e.g. { "0001_201638.zip", "0001_201639.rar" }
    }
}
