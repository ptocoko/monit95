using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTO;
using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class TestResultService : ITestResultService
    {
        private IRepositoryV2<TestElement> _testElementRep;
        private IRepositoryV2<TestResult> _testResultRep;
        public TestResultService(IRepositoryV2<TestElement> testElementRep, IRepositoryV2<TestResult> testResultRep)
        {
            _testElementRep = testElementRep;
            _testResultRep = testResultRep;
        }

        //Метод возвращает группу результатов участников по срезам на указанную дату (testDate) 
        public ReportsDto SelectParticipsGroupResults(Guid testId, DateTime testDate)
        {
            var queryResults = _testResultRep.GetAll().Where(x => x.ParticipTest.ProjectTest.TestId == testId) //все результаты участников по данному эказамену 
                                        .GroupBy(x => x.ParticipTest.ParticipCode)
                                        .Where(x => x.Any(y => y.ParticipTest.ProjectTest.TestDate == testDate)).ToList();

            ReportsDto reports = new ReportsDto();
            reports.BlockName = queryResults.First().First().ParticipTest.ProjectTest.Test.Name.ToUpper();
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
