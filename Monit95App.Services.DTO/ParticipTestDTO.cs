using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO
{
    public class ParticipTestDTO
    {        
        public int ProjectCode { get; set; }
        public Guid TestId { get; set; }
        public int TestNumber { get; set; }
        public DateTime TestDate { get; set; }
        public string ParticipCode { get; set; }
        public IEnumerable<ExerMarkDTO> ExerMarkDTOs { get; set; } = new List<ExerMarkDTO>();
    }
}
