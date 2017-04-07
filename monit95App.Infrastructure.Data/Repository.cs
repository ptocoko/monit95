using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Data
{
    public class Repository<T> : IRepositoryV2<T> where T : class
    {
        protected cokoContext _context;

        public Repository(IUnitOfWork unitOfWork)
        {
            _context = unitOfWork.DbContext;
        }

        public IQueryable<T> GetAll()
        {
            IQueryable<T> query = _context.Set<T>();
            return query;
        }

        public void Insert(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Attach(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }
    }
}
