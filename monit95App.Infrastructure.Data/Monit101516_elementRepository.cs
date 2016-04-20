using monit95App.Domain.Core;
using monit95App.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace АИС_МОР.Domain.Concrete.Monit10_1516
{
    public class Monit101516_elementRepository : IMonit101516_elementRepository
    {

        private cokoContext context;
        public Monit101516_elementRepository(cokoContext context)
        {
            this.context = context;
        }
        public IQueryable<monit10_1516_el> All
        {
            get
            {
                return context.monit10_1516_el;
            }
        }
    }
}
