using Monit95App.Domain.Core;
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
            _db = db;
        }
        public IEnumerable<IGrouping<string, TestResult>> GetParticipGroupResultByDate(int projectCode, Guid testId, DateTime testDate)
        {
            var result = _db.TestResults.Where(x => x.ProjectCode == projectCode && x.TestId == testId)
                                        .GroupBy(x => x.ParticipCode)
                                        .Where(x => x.Any(y => y.TestDate == testDate));         

            return result;
        }
    }
}
