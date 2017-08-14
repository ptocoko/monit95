using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Domain.Core;
using System.Data;

namespace Monit95App.Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(cokoContext context)
        {
            DbContext = context;           
        }

        public cokoContext DbContext { get; private set; }    

        public int Save()
        {
            return DbContext.SaveChanges();
        }

        public void Dispose(bool disposing)
        {
            if (!disposing)
            {
                return;
            }

            if (DbContext == null)
            {
                return;
            }
            DbContext.Dispose();
            DbContext = null;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
