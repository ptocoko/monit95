using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class FirstClassSubResult
    {
        public int Id { get; set; }
        public int ParticipTestId { get; set; }
        public int QuestionId { get; set; }
        public int Value { get; set; }

        public virtual ParticipTest ParticipTest { get; set; }
        public virtual FirstClassQuestion Question { get; set; }
    }
}
