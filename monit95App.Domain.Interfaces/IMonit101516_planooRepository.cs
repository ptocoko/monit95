using monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Domain.Interfaces
{
   public interface IMonit101516_planooRepository
    {
        monit10_1516_planoo GetBySchoolIDandElcode(string schoolID, string elCode);
        void Upsert(monit10_1516_planoo planOO); //вставка или обновление
        void Save();
        IQueryable<monit10_1516_planoo> All { get; }        
    }
}
