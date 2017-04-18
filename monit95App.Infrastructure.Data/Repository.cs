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

        public void Insert(T entity)
        {
            _context.Set<T>().Add(entity);                        
        }

        public IQueryable<T> GetAll()
        {
            IQueryable<T> query = _context.Set<T>();    
            return query;
        }
        public T GetById(int id)
        {
            return _context.Set<T>().Find(id);
        }
       
        public void Update(T entity)
        {
            // _context.Set<T>().Attach(entity);
            var entry = _context.Entry(entity);
            entry.State = System.Data.Entity.EntityState.Modified;
        }

        public void Delete(int id)
        {
            var entity = _context.Set<T>().Find(id);
            _context.Set<T>().Remove(entity);
            
            //var entry = _context.Entry(entity);
            //entry.State = System.Data.Entity.EntityState.Deleted;           
        }
    }
}
