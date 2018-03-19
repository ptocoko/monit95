using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class ParticipsCompetence
    {
        public int Code { get; set; }

        public string FIO { get; set; }

        public string SchoolId { get; set; }

        public string SchoolName { get; set; }

        public int PrimaryMark { get; set; }

        // 2, 3 or 5
        public int CompetenceLevel { get; set; }

        public string Marks { get; set; }
    }
}
