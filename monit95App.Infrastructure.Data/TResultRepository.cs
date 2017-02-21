using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data
{
    public class TResultRepository : IRepository<TestResult>
    {
        private cokoContext _db;
        public TResultRepository(cokoContext db)
        {
            _db = db;
        }
        public IEnumerable<TestResult> GetOpenTestResultsForArea(int areaCode)
        {
            return _db.TestResults.Where(x => x.TestPlan.StatusCode == true);
        }
        public void Add(TestResult item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(string id)
        {
            throw new NotImplementedException();
        }

        public TestResult Get(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TestResult> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(TestResult item)
        {
            throw new NotImplementedException();
        }
    }
}
