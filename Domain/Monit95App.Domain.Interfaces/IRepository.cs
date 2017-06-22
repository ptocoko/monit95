using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll(); //get all objects
        T Get(string id);
        void Add(T item);
        void Update(T item);
        bool Delete(string id);        
    }
}
