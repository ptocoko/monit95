using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProtocolGenerator
{
    public class ParticipProtocol
    {        
        public int Id { get; set; }
        public string Code { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassName { get; set; }                
        public string Marks { get; set; }
        public string Skills { get; set; }

        //public string SubjectName { get; set; }
        public ISubjectName Subject { get; set; }
        public string Grade5Str { get; set; }
    }
}
