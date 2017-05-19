using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Data.Interfaces;
using ProtocolGenerator.Interfaces;

namespace ProtocolGenerator
{
    public class ParticipProtocol
    {        
        public int Id { get; set; } //ParticipId
        public string Code { get; set; } //ParticipCode
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassName { get; set; }                
        public string Marks { get; set; } //last test
        public string Skills { get; set; }

        private ISubjectName _subjectName;
        private IGrade5Name _grade5Name;

        public ParticipProtocol(ISubjectName subjectName, IGrade5Name grade5Name)
        {
            _subjectName = subjectName;
            _grade5Name = grade5Name;
        }
    }
}
