using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces.Rsur
{
    public interface IRsurReportModelService
    {
        Task<Stream> GetXlsxStream(int? areaCode = null, string schoolId = null);                                                            
    }
}
