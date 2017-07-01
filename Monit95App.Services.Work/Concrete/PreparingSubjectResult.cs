using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Work.Concrete
{
    public class PreparingSubjectResult
    {
        private readonly string maxMarks;

        public PreparingSubjectResult(string _maxMarks)
        {
            this.maxMarks = _maxMarks;
        }

        public string CreateMarks(string _marksWithoutMax) 
        {
            return null;
        }
    }
}
