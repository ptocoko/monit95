using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class Element
    {
        public int Id { get; set; }
        public int Code { get; set; }
        public string Name { get; set; }

        public virtual ICollection<EgeElementQuestion> EgeElementQuestions { get; set; } = new HashSet<EgeElementQuestion>();
    }
}
