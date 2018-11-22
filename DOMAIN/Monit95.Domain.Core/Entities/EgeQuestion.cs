namespace Monit95App.Domain.Core.Entities
{
    using System.Collections.Generic;

    public partial class EgeQuestion
    {                
        public int Id { get; set; }

        public int SubjectCode { get; set; }
        
        public string Years { get; set; }

        public int Order { get; set; }

        public string ElementNames { get; set; }

        public virtual ICollection<RsurQuestion> RsurQuestions { get; set; } = new HashSet<RsurQuestion>();

        public virtual ICollection<EgeElementQuestion> EgeElementQuestions { get; set; } = new HashSet<EgeElementQuestion>();
    }
}
