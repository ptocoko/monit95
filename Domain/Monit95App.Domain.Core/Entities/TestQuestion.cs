using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class TestQuestion
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int QuestionId { get; set; }
        public Guid TestId { get; set; }

        public virtual Test Test { get; set; }
        public virtual Question Question { get; set; }
    }
}
