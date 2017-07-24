using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Core;

namespace Monit95App.Services
{
    public class SchoolRepository : IRepository<Domain.Core.School>
    {
        private cokoContext db;
        public SchoolRepository(cokoContext db)
        {
            this.db = db;
        }

        public void Add(Domain.Core.School item)
        {
            db.Schools.Add(item);
        }

        public bool Delete(string id)
        {
            var entity = db.Schools.Find(id);
            var deletedSchool = db.Schools.Remove(entity);
            if(deletedSchool != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public Domain.Core.School Get(string id)
        {
            var all = db.Schools.ToList();            
            return db.Schools.Find(id);
        }
        public IEnumerable<Domain.Core.School> GetAll()
        {
            var all = db.Schools.ToList();
            return db.Schools.ToList();
        }

        //TODO: адаптер вместо отдельного метода GetAreaAll
        public IEnumerable<Domain.Core.School> GetAreaAll(int areaCode)
        {
            return db.Schools.Where(x => x.AreaCode == areaCode);
        }

        public void Update(Domain.Core.School item)
        {
            throw new NotImplementedException();
        }
    }
}
