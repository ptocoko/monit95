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
    public class UnitOfWorkV2 : IUnitOfWork
    {
        private cokoContext _context;

        public UnitOfWorkV2(cokoContext context)
        {
            _context = context;
           // _context.Configuration.LazyLoadingEnabled = false;
        }

        public cokoContext DbContext
        {
            get
            {
                return _context;
            }
        }

        public int Save()
        {
            return _context.SaveChanges();
        }

        public void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this._context != null)
                {
                    this._context.Dispose();
                    this._context = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
