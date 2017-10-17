using System.Collections.Generic;

namespace Monit95App.Services.Interfaces
{
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Rsur;

    public interface IRsurTestService
    {
        //TODO: delete
        RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);

        IDictionary<int, RsurTestStatisticsDto> GetStatistics2(int areaCode);
        string GetTestName(int rsurTestId);

        IEnumerable<RsurTestProtocol> GetProtocols(int rsurTestId, int areaCode);
    }
}
