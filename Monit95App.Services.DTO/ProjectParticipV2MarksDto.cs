using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO
{
    public class ProjectParticipV2MarksDto
    {
        public int Id { get; set; }
        public Guid TestId { get; set; }
        public int ParticipId { get; set; }
        public string Marks { get; set; }
    }
}
