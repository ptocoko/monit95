using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProtocolGenerator.Interfaces
{
    public abstract class ParticipProtocol
    {        
        public int Id { get; set; } //ParticipId
        public string Code { get; set; } //ParticipCode
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassName { get; set; }                
        public string Marks { get; set; }
        public string Skills { get; set; }                        
    }
}
