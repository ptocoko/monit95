﻿using System.Collections.Generic;
using Monit95App.Services.DTOs;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.Rsur.Protocol
{
    public interface IProtocolService
    {
        //TODO: delete
        //RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null);        
        IDictionary<int, RsurTestStatisticsDto> GetStatistics(int areaCode);
        string GetTestName(int rsurTestId);

        IEnumerable<Protocol> GetProtocols(int rsurTestId, int areaCode);        
        RsurParticipEditProtocol GetProtocol(int rsurParticipTestId);
    }
}
