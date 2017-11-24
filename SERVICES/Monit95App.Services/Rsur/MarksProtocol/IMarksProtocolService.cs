using System.Collections.Generic;
using Monit95App.Services.DTOs;

namespace Monit95App.Services.Rsur.MarksProtocol
{
    public interface IMarksProtocolService
    {
        //TODO: delete
        //RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);        
        IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode);
        string GetTestName(int rsurTestId);

        IEnumerable<Domain.Core.MarksProtocol> GetProtocols(int rsurTestId, int areaCode);        
        RsurParticipEditProtocol GetProtocol(int rsurParticipTestId);

        Domain.Core.MarksProtocol Get(int participCode, int areaCode); // areaCode for Validate
        void Add(PostMarksProtocol postMarksProtocol, int areaCode);
    }
}
