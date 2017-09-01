using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Monit95App.Services.Interfaces;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services
{
    public class RsurTestResultService : IRsurTestResultService
    {
        private readonly IGenericRepository<Element> _testElementRep;
        private readonly IGenericRepository<RsurTestResult> _testResultRep;
        public RsurTestResultService(IGenericRepository<Element> testElementRep, IGenericRepository<RsurTestResult> testResultRep)
        {
            _testElementRep = testElementRep;
            _testResultRep = testResultRep;
        }

        public RsurTestResultService()
        {
            
        }

        //Метод возвращает группу результатов участников по срезам на указанную дату (testDate) 
        public ReportsDto SelectParticipsGroupResults(Guid testId, DateTime testDate)
        {
           return new ReportsDto();
        }       
    }
}
