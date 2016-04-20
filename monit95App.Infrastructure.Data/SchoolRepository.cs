using monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using monit95App.Domain.Core;

namespace monit95App.Infrastructure.Data
{

    public class SchoolRepository : ISchoolRepository
    {
        private cokoContext db;
        public SchoolRepository(cokoContext db)
        {
            this.db = db;
        }
        public school GetById(string schoolID)
        {
            return db.schools.Find(schoolID);
        }
    }
}
