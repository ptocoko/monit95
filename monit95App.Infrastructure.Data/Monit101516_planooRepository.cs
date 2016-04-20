using monit95App.Domain.Core;
using monit95App.Domain.Interfaces;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Infrastructure.Data
{
    public class Monit101516_planooRepository : IMonit101516_planooRepository
    {
        private cokoContext context;
        public monit10_1516_planoo GetBySchoolIDandElcode(string schoolID, string elCode)
        {
            var record = context.monit10_1516_planoo.Where(x => x.SchoolID == schoolID && x.ElCode == elCode);
            if(record.Any())
            {
                return record.First();
            }
            else
            {
                return null;
            }
            
        }
        public void Upsert(monit10_1516_planoo planoo)
        {         

        }
        public IQueryable<monit10_1516_planoo> All
        {
            get
            {
                return context.monit10_1516_planoo;
            }
        }         
        public void Save()
        {
            context.SaveChanges();
        }

        public Monit101516_planooRepository(cokoContext context)
        {
            this.context = context;
           
        }
    }
}
