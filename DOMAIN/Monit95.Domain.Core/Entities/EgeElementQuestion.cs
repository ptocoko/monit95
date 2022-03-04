using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class EgeElementQuestion
    {
        public int Id { get; set; }
        public int ElementId { get; set; }
        public int EgeQuestionId { get; set; }

        public virtual Element Element { get; set; }
        public virtual EgeQuestion EgeQuestion { get; set; }
    }
}
