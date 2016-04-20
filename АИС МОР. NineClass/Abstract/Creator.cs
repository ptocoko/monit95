using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace АИС_МОР.NineClass.Abstract
{
    public abstract class Creator
    {
        public abstract Result CreateSchoolResultFromWordTable_(string wordFullFileName);
    }
}
