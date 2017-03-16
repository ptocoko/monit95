﻿using Monit95App.Domain.Core;
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
        private ParticipTestRepository participTestRepository;
                       
        
        public ParticipTestRepository ParticipTests
        {
            get
            {
                if (participTestRepository == null)
                    participTestRepository = new ParticipTestRepository(db);
                return participTestRepository;
            }
        }

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
