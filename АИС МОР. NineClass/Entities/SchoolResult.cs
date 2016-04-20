using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using АИС_МОР.NineClass.Abstract;

namespace АИС_МОР.NineClass.Entities
{
    public class SchoolResult : Result
    {
        public string SchoolID { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public string E { get; set; }
        public string F { get; set; }
        public string G { get; set; }
        public string H { get; set; }
        public string I { get; set; }
        public string J { get; set; }
        public int CountPart { get; set; }

        public void DeleteChar() //удалить все знаки кроме цифр
        {
            Regex rgx = new Regex("[^a-zA-Z0-9 -]");
            
            SchoolID = rgx.Replace(SchoolID, "");
            B = rgx.Replace(B, "");
            C = rgx.Replace(C, "");
            D = rgx.Replace(D, "");
            E = rgx.Replace(E, "");
            F = rgx.Replace(F, "");
            G = rgx.Replace(G, "");
            H = rgx.Replace(H, "");
            I = rgx.Replace(I, "");
            J = rgx.Replace(J, "");            
        }
    }
}
