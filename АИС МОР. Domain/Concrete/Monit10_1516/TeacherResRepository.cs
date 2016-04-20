using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using АИС_ГИА.Domain.Concrete;
using АИС_МОР.Domain.Abstract;

namespace АИС_МОР.Domain.Concrete.Monit10_1516
{
    public class TeacherResRepository : ITeacherResRepository
    {
        private АИС_ГИА.Domain.Concrete.cokoEntities context;
        public TeacherResRepository(АИС_ГИА.Domain.Concrete.cokoEntities context)
        {
            this.context = context;
        }
        public IQueryable<monit10_1516_tres> All
        {
            get
            {
                return context.monit10_1516_tres;
            }

        }
    }
}
