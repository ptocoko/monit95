using Monit95App.Domain.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Work.Concrete
{
    public class MarksFormat2 : IMarks 
    {
        public IEnumerable<string> GetMarks(string[] format2) //format2 = "1;0;1|2;1;1"
        {
            List<string> result = new List<string>();
            foreach(var str in format2)
            {
                result.Add(str.Substring(0, str.IndexOf('|')));
            }

            return result; //result = "1;0;1"
        }
    }
}
