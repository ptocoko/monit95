using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class OneTwoThreeQuestion
    {
        public int Id { get; set; }

        public int Number { get; set; }

        public string Name { get; set; }

        public int MaxMark { get; set; }

        public Guid TestId { get; set; }

        public virtual Test Test { get; set; }

        public virtual ICollection<OneTwoThreeQuestionMark> OneTwoThreeQuestionMarks { get; set; } = new HashSet<OneTwoThreeQuestionMark>();
    }
}
