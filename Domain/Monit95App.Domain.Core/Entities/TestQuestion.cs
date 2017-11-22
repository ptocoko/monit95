namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class TestQuestion
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TestQuestion()
        {
            RsurEgeQuestions = new HashSet<RsurEgeQuestion>();
        }

        public int Id { get; set; }

        public Guid TestId { get; set; }

        public int QuestionId { get; set; }

        public int Order { get; set; }

        [Required]
        [StringLength(5)]
        public string Name { get; set; }        

        public virtual Question Question { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RsurEgeQuestion> RsurEgeQuestions { get; set; }

        public virtual Test Test { get; set; }
    }
}
