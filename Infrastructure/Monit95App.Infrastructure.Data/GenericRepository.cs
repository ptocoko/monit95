using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using System;
using System.Linq;

namespace Monit95App.Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly CokoContext Context;

        public GenericRepository(CokoContext cokoContext)
        {
            Context = cokoContext;
        }

        public void Insert(T entity)
        {
            Context.Set<T>().Add(entity);
            Save();
        }

        public IQueryable<T> GetAll()
        {
            IQueryable<T> query = Context.Set<T>();    
            return query;
        }
        public T GetById(int id)
        {
            return Context.Set<T>().Find(id);
        }

        public T GetById(string id)
        {
            return Context.Set<T>().Find(id);
        }

        public void Update(T entity)
        {            
            var entry = Context.Entry(entity);
            entry.State = System.Data.Entity.EntityState.Modified;

            Save();
        }

        public void Delete(int id)
        {
            var entity = Context.Set<T>().Find(id);            
            if (entity == null)
            {
                throw new ArgumentException("Объект с таким первичным ключем не найден в базе данных для удаления");
            }
            Context.Set<T>().Remove(entity);

            Save();
        }

        public void Delete(string id)
        {
            var entity = Context.Set<T>().Find(id);
            if (entity == null)
            {
                throw new ArgumentException("Объект с таким первичным ключем не найден в базе данных для удаления");
            }
            Context.Set<T>().Remove(entity);

            Save();
        }

        public virtual void Save()
        {
            Context.SaveChanges();
        }
    }
}
