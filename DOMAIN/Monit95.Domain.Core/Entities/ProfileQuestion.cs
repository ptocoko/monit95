using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class ProfileQuestion
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
        public bool IsBooleanAnswer { get; set; }
        public bool HasSessions { get; set; }
        public int? MaxValue { get; set; }
        public bool Required { get; set; }

        public string SelectValues { get; set; }

        public int? ProfileId { get; set; }

        public virtual ICollection<ProfileQuestionAnswer> ProfileQuestionAnswers { get; set; }
    }
}
