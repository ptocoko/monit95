using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class SchoolReportsCollector
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public string SchoolId { get; set; }

        public bool IsGot { get; set; }

        public virtual Report Reports { get; set; }

        public virtual School Schools { get; set; }
    }
}
