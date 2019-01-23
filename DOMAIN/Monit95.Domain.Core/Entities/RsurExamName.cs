using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class RsurExamName
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public bool IsGeneralRsur { get; set; }

        public virtual ICollection<RsurTest> RsurTests { get; set; } = new HashSet<RsurTest>();
    }
}
