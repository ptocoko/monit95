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
            var queryResults = _testResultRep.GetAll().Where(x => x.RsurParticipTest.RsurTest.TestId == testId) //все результаты участников по данному экзамену 
                                        .GroupBy(x => x.RsurParticipTest.ParticipCode)
                                        .Where(x => x.Any(y => y.RsurParticipTest.RsurTest.TestDate == testDate)).ToList();

            ReportsDto reports = new ReportsDto();
            reports.BlockName = queryResults.First().First().RsurParticipTest.RsurTest.Test.Name.ToUpper();
            reports.TestDate = testDate;
            reports.PartsDescription = _testElementRep.GetAll().Where(p => p.TestId == testId && p.ElementTypeId == 2).Select(s =>  new DescriptionDto { Code = s.Code, ExerNames = s.ExerNames.Replace(";", "; "), Name = s.Name  }).ToList();
            reports.ElementsDescription = _testElementRep.GetAll().Where(p => p.TestId == testId && p.ElementTypeId == 1).Select(s => new DescriptionDto { Code = s.Code, ExerNames = s.ExerNames.Replace(";", "; "), Name = s.Name }).ToList();

            List<ParticipReportDto> participReports = new List<ParticipReportDto>();
            foreach (var queryResult in queryResults)
            {
                var report = new ParticipReportDto()
                {
                    ParticipCode = queryResult.Key,
                    Results = queryResult.Select(s => new ParticipResultDto
                    {
                        PrimaryMark = Convert.ToInt32(s.PrimaryMark),
                        Grade5 = s.Grade5,
                        Marks = s.Marks.Split(new char[] { '|' })[0].Replace(";", "; "),
                        PartsResults = s.Parts.Replace(',', '.').Split(new char[] { ';' }).Select(x => double.Parse(x, CultureInfo.InvariantCulture) * 100).ToArray(),
                        ElementsResults = s.Elements.Replace(',', '.').Split(new char[] { ';' }).Select(y => double.Parse(y, CultureInfo.InvariantCulture) * 100).ToArray()
                    }).ToList()
                };
                participReports.Add(report);
            }

            reports.ParticipReports = participReports;

            return reports;
        }       
    }
}
