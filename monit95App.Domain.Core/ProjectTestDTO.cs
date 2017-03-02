using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core
{
    public class ProjectTestDTO
    {
        public int ProjectCode { get; set; }
        public Guid TestId { get; set; }
        public string TestNumberCode { get; set; }
        public string TestName { get; set; }
        public int TestNumber { get; set; }
        public DateTime TestDate { get; set; }
        public IEnumerable<ParticipTestDTO> ParticipTestDTOs { get; set;} = new List<ParticipTestDTO>();

    }
}
