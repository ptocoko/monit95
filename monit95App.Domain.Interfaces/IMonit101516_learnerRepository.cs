using monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace monit95App.Domain.Interfaces
{
    public interface IMonit101516_learnerRepository
    {
        IQueryable<monit10_1516_learner> All { get; }   

        void InsertLearner(monit10_1516_learner learner);
        void Save();
        void Delete(int learnerID);                     
    }
}
