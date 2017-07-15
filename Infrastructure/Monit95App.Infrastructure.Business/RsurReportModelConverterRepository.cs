using Monit95App.Infrastructure.Business.Interfaces.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business
{
    static class RsurReportModelConverterRepository
    {        
        static IRsurReportModelWriter GetWriter(string format)
        {
            if (format == null || !format.Equals("xlsx"))
            {
                throw new ArgumentException("format", "RsurReportModelConverterRepository.GetWriter");
            }
            if (format.Equals("xlsx"))
                return new RsurReportModelXlsxWriter();

            return null;
        }
    }
}
