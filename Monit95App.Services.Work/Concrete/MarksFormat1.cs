using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class MarksFormat1 : IMarks //format1 = "0,5(1);1(1);0(2)"
    {
        public IEnumerable<string> GetMarks(string[] strings) 
        {
            List<string> result = new List<string>();

            Regex rgx = new Regex(@"(\(\d\))");
            foreach (var str in strings)
            {
                result.Add(rgx.Replace(str, "")); //"0,5(1);1(1);0(2)" -> "0,5;1;0")
            }

            return result;
        }
    }
}
