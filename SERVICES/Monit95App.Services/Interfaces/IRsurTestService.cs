using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    using Monit95App.Services.Rsur;

    public interface IRsurTestService
    {
        RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);
    }
}
