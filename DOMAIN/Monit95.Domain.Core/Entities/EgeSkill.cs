using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class EgeSkill
    {
        public int Id { get; set; }
        public int EgeTaskCode { get; set; }
        public string SkillNames { get; set; }
        public int SubjectCode { get; set; }

        //public virtual ICollection<RsurQuestion> RsurQuestions { get; set; } = new HashSet<RsurQuestion>();
        public virtual ICollection<EgeQuestion> EgeQuestions { get; set; } = new HashSet<EgeQuestion>();
    }
}
