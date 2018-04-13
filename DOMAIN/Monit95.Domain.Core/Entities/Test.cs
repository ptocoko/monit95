namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;

    public class Test
    {        
        public Guid Id { get; set; }
        
        public string NumberCode { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }        

        public int? Number { get; set; }

        public bool IsFinal { get; set; }

        public virtual ICollection<Grade> Grades { get; set; } = new HashSet<Grade>();

        public virtual ICollection<ProjectTest> ProjectTests { get; set; } = new HashSet<ProjectTest>();
        
        public virtual ICollection<RsurTest> RsurTests { get; set; } = new HashSet<RsurTest>();

        public virtual ICollection<RsurQuestion> Questions { get; set; } = new HashSet<RsurQuestion>();
    }
}
