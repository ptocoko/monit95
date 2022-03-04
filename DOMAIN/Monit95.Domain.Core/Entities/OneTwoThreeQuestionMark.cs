using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class OneTwoThreeQuestionMark
    {
        public int Id { get; set; }

        public int ParticipTestId { get; set; }
        public virtual ParticipTest ParticipTest { get; set; }

        public int OneTwoThreeQuestionId { get; set; }
        public virtual OneTwoThreeQuestion OneTwoThreeQuestion { get; set; }

        public int AwardedMark { get; set; }
    }
}
