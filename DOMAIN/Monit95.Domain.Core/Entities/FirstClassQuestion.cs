using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class FirstClassQuestion
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TaskNumber { get; set; }
        public int? SubTaskNumber { get; set; }
        public int? ExtraTaskNumber { get; set; }
        public int MaxMark { get; set; }

        public string Year { get; set; }

        public virtual ICollection<FirstClassSubResult> FirstClassSubResults { get; set; } = new HashSet<FirstClassSubResult>();
    }
}
