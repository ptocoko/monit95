using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data
{
    public class UnitOfWork : IDisposable
    {
        private cokoContext db;
        private SchoolRepository schoolRepository;
        private PParticipRepository pparticipRepository;
        private TResultRepository tresultRepository;

        //
        private IRepository<TestResult> p;
        public TResultRepository TResults2
        {
            get
            {
                if (p == null)
                    p = new TResultRepository(db);
                return tresultRepository;
            }
        }
        //

        public UnitOfWork(cokoContext db)
        {
            this.db = db;
        }
        public SchoolRepository Schools
        {
            get
            {
                if (schoolRepository == null)
                    schoolRepository = new SchoolRepository(db);
                return schoolRepository;
            }
        }

        public PParticipRepository PParticips
        {
            get
            {
                if (pparticipRepository == null)
                    pparticipRepository = new PParticipRepository(db);
                return pparticipRepository;
            }
        }

        public TResultRepository TResults
        {
            get
            {
                if (tresultRepository == null)
                    tresultRepository = new TResultRepository(db);
                return tresultRepository;
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
