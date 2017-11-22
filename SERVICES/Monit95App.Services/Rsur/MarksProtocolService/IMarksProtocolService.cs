using System.Collections.Generic;
using Monit95App.Services.DTOs;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services.Rsur.Protocol
{
    public interface IMarksProtocolService
    {
        //TODO: delete
        //RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);        
        IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode);
        string GetTestName(int rsurTestId);

        IEnumerable<MarksProtocol> GetProtocols(int rsurTestId, int areaCode);        
        RsurParticipEditProtocol GetProtocol(int rsurParticipTestId);
        
        MarksProtocol Get(int participCode, int areaCode); // areaCode for Validate
    }
}
