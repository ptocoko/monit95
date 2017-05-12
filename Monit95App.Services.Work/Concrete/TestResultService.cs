using Monit95App.Domain.Core;
using Monit95App.Services.DTO;
using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class TestResultService : ITestResultService
    {
        private cokoContext _db;
        public TestResultService(cokoContext db)
        {
            this._db = db;
        }

        //Метод возвращает группу результатов участников по срезам на указанную дату (testDate) 
        public ReportsDto SelectParticipsGroupResults(Guid testId, DateTime testDate)
        {
            var queryResults = _db.TestResults.Where(p => p.ParticipTest.ProjectTest.TestId == testId && p.ParticipTest.ProjectTest.TestDate == testDate).GroupBy(s => s.ParticipTest.ParticipCode).ToList();

            ReportsDto reports = new ReportsDto();
            reports.BlockName = queryResults.First().First().ParticipTest.ProjectTest.Test.Name.ToUpper();
            reports.TestDate = testDate;
            reports.PartsDescription = _db.TestElements.Where(p => p.TestId == testId && p.ElementTypeId == 2).Select(s =>  new DescriptionDto { Code = s.Code, ExerNames = s.ExerNames, Name = s.Name  }).ToList();
            reports.ElementsDescription = _db.TestElements.Where(p => p.TestId == testId && p.ElementTypeId == 1).Select(s => new DescriptionDto { Code = s.Code, ExerNames = s.ExerNames, Name = s.Name }).ToList();

            List<ParticipReportDto> participReports = new List<ParticipReportDto>();
            foreach (var queryResult in queryResults)
            {
                var report = new ParticipReportDto();
                report.ParticipCode = queryResult.Key;
                report.Results = queryResult.Select(s => new ParticipResultDto { PrimaryMark = Convert.ToInt32(s.PrimaryMark), Grade5 = s.Grade5, Marks = s.Marks.Split(new char[] { '|' })[0],
                    PartsResults = s.Parts.Replace(',', '.').Split(new char[] { ';' }).Select(x => Convert.ToDouble(x)*100).ToArray(),
                    ElementsResults = s.Elements.Replace(',', '.').Split(new char[] {';'}).Select(y => Convert.ToDouble(y)*100).ToArray() }).ToList();

                participReports.Add(report);
            }

            reports.ParticipReports = participReports;

            return reports;
        }
    }
}
