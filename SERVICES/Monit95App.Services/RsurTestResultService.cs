using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Monit95App.Services.Interfaces;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.RsurTestResult;
using Monit95App.Services.DTOs;
using Monit95App.Services.Rsur;

namespace Monit95App.Services
{
    public class RsurTestResultService : IRsurTestResultService
    {
        private CokoContext context;

        public RsurTestResultService(CokoContext context)
        {
            this.context = context;
        }

        public RsurTestResultService()
        {
            
        }

        //Метод возвращает группу результатов участников по срезам на указанную дату (testDate) 
        public ReportsDto SelectParticipsGroupResults(Guid testId, DateTime testDate)
        {
           return new ReportsDto();
        }

        public RsurTestStatisticsDto GetStatistics(int rsurTestId, int? areaCode = null)
        {
            throw new NotImplementedException();
        }

        public IDictionary<int, RsurTestStatisticsDto> GetStatistics2(int areaCode)
        {
            throw new NotImplementedException();
        }

        public string GetTestName(int rsurTestId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<RsurParticipShowProtocol> GetProtocols(int rsurTestId, int areaCode)
        {
            throw new NotImplementedException();
        }

        public RsurParticipEditProtocol GetProtocol(int rsurParticipTestId)
        {
            throw new NotImplementedException();
        }
    }
}
