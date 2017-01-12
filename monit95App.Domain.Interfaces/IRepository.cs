using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Interfaces
{
    public interface IRepository<T>
        where T : class
    {
        IEnumerable<T> GetTList(); //получение всех объектов        
        T GetT(string id);
        void Create(T item);
        void Save();
        void Update(T item);
        //void Delete(int id);
    }
}
