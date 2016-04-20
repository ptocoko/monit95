using monit95App.Domain.Core;
using monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace АИС_МОР.Domain.Concrete.Monit10_1516
{
    public class Monit101516_learnerRepository : IMonit101516_learnerRepository
    {
        private cokoContext context;
        public Monit101516_learnerRepository(cokoContext context)
        {
            this.context = context;
        }
        public void InsertLearner(monit10_1516_learner learner)
        {
            context.monit10_1516_learner.Add(learner);         
        }
        public void Save()
        {
            context.SaveChanges();
        }
        public void Delete(int learnerID)
        {
            monit10_1516_learner learner = context.monit10_1516_learner.Find(learnerID);
            context.monit10_1516_learner.Remove(learner);
        }
        public IQueryable<monit10_1516_learner> All
        {
            get
            {
                return context.monit10_1516_learner;
            }

        }
    }
}
