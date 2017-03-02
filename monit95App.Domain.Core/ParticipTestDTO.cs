using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core
{
    public class ParticipTestDTO
    {
        public string ParticipCode { get; set; }
        public IEnumerable<ExerMarkDTO> ExerMarkDTOs { get; set; } = new List<ExerMarkDTO>();
    }
}
