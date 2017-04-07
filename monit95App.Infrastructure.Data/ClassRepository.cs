using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data
{
    public class ClassRepository : IRepository<Class>
    {
        private cokoContext db;

        public ClassRepository(cokoContext db)
        {
            this.db = db;
        }

        public void Add(Class item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item));
            }
            else
            {
                db.Classes.Add(item);
            }
        }

        public bool Delete(string id)
        {
            throw new NotImplementedException();
        }

        public Class Get(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Class> GetAll()
        {
            var classes= db.Classes.ToList();
            return classes;
        }

        public void Update(Class item)
        {
            throw new NotImplementedException();
        }
    }
}
