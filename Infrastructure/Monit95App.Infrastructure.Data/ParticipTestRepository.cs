using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data
{
    public class ParticipTestRepository : IRepository<ParticipTest>
    {
        private cokoContext _db;
        public ParticipTestRepository(cokoContext db)
        {
            _db = db;
        }
        public void Add(ParticipTest item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(string id)
        {
            throw new NotImplementedException();
        }

        public ParticipTest Get(string id)
        {
            var primaryKeyArr = id.Split('_');
            var participTest = _db.ParticipTests.Find(Convert.ToInt32(primaryKeyArr[0]),
                                                      new Guid(primaryKeyArr[1]),
                                                      Convert.ToInt32(primaryKeyArr[2]),
                                                      DateTime.Parse(primaryKeyArr[3]),
                                                      primaryKeyArr[4]);
            if(participTest != null)
            {
                return participTest;
            }
            else
            {
                throw new ArgumentNullException("_db.ParticipTests.Find");
            }
        }

        public IEnumerable<ParticipTest> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(ParticipTest item)
        {
            throw new NotImplementedException();
        }
    }
}
