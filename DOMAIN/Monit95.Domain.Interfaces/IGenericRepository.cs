using System.Linq;

namespace Monit95App.Domain.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        T GetById(int id);
        T GetById(string id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(int id);
        void Delete(string id);
        void Save();
    }
}
