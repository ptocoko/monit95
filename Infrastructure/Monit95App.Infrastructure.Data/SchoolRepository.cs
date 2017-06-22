using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Core;

namespace Monit95App.Infrastructure.Data
{
    public class SchoolRepository : IRepository<School>
    {
        private cokoContext db;
        public SchoolRepository(cokoContext db)
        {
            this.db = db;
        }

        public void Add(School item)
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

        public School Get(string id)
        {
            var all = db.Schools.ToList();            
            return db.Schools.Find(id);
        }
        public IEnumerable<School> GetAll()
        {
            var all = db.Schools.ToList();
            return db.Schools.ToList();
        }

        //TODO: адаптер вместо отдельного метода GetAreaAll
        public IEnumerable<School> GetAreaAll(int areaCode)
        {
            return db.Schools.Where(x => x.AreaCode == areaCode);
        }

        public void Update(School item)
        {
            throw new NotImplementedException();
        }
    }
}
