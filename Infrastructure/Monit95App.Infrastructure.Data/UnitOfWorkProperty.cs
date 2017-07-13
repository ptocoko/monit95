using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data
{
    public class UnitOfWorkProperty : IDisposable
    {
        private cokoContext _db;
        private SchoolRepository schoolRepository;
        private ProjectParticipRepository projectParticipRepository;              

        public UnitOfWorkProperty(cokoContext db)
        {
            _db = db;
        }
        public SchoolRepository Schools
        {
            get
            {
                if (schoolRepository == null)
                    schoolRepository = new SchoolRepository(_db);
                return schoolRepository;
            }
        }

        public ProjectParticipRepository ProjectParticips
        {
            get
            {
                if (projectParticipRepository == null)
                    projectParticipRepository = new ProjectParticipRepository(_db);
                return projectParticipRepository;
            }
        }        

        public void Save()
        {
            _db.SaveChanges();            
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _db.Dispose();
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
