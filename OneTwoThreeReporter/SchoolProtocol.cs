using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneTwoThreeReporter
{
    public class SchoolProtocol
    {
        public string SchoolName { get; set; }
        public string AreaName { get; set; }
        public List<ParticipProtocol> ParticipProtocols { get; set; } = new List<ParticipProtocol>();
        
    }
}
