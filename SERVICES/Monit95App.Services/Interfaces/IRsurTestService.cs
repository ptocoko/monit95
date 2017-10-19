using System.Collections.Generic;

namespace Monit95App.Services.Interfaces
{
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Rsur;

    public interface IRsurTestService
    {
        IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode);
        string GetTestName(int rsurTestId);

        IEnumerable<RsurTestProtocol> GetProtocols(int rsurTestId, int areaCode);
    }
}
