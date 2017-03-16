using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class TestResultService
    {
        private cokoContext _db;
        public TestResultService(cokoContext db)
        {
            this._db = db;
        }

        //Метод возвращает группу результатов участников по срезам на указанную дату (testDate) 
        public IEnumerable<IGrouping<string, TestResult>> SelectParticipsGroupResults(int projectCode, Guid testId, DateTime testDate)
        {
            var result = _db.TestResults.Where(x => x.ProjectCode == projectCode && x.TestId == testId) //все результаты участников по данному эказамену (testId)
                                        .GroupBy(x => x.ParticipCode )
                                        .Where(x => x.Any(o => o.TestDate == testDate)) //должен быть результат на указанную дату testDate
                                        .ToList();            
            return result;
        }
    }
}
