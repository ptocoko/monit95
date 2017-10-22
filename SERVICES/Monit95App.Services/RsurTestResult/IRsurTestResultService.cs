using System.Collections.Generic;
using Monit95App.Services.DTOs;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.RsurTestResult
{
    public interface IRsurTestResultService
    {
        //TODO: delete
        RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);        

        IDictionary<int, RsurTestStatisticsDto> GetStatistics2(int areaCode);
        string GetTestName(int rsurTestId);

        IEnumerable<RsurParticipShowProtocol> GetProtocols(int rsurTestId, int areaCode);
        RsurParticipEditProtocol GetProtocol(int rsurParticipTestId);
    }
}
