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

        //Метод возвращает группу результатов участников по срезам на указанную дату (testDate) 
        public IEnumerable<IGrouping<string, TestResult>> SelectParticipsGroupResults(Guid testId, DateTime testDate)
        {
            var result = _db.TestResults.Where(x => x.ParticipTest.ProjectTest.TestId == testId) //все результаты участников по данному эказамену 
                                        .GroupBy(x => x.ParticipTest.ParticipCode)
                                        .Where(x => x.Any(y => y.ParticipTest.ProjectTest.TestDate == testDate)).ToList(); //должен быть результат на указанную дату testDate

                   
            return result;
        }
    }
}
