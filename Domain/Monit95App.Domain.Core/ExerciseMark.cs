namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ExerciseMark
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ExerciseMark()
        {
            TestResultsV2 = new HashSet<TestResultsV2>();
        }

        public int Id { get; set; }

        public int ProjectParticipId { get; set; }

        public Guid TestId { get; set; }

        [Required]
        [StringLength(255)]
        public string Marks { get; set; }

        public virtual Particip Particip { get; set; }

        public virtual Test Test { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TestResultsV2> TestResultsV2 { get; set; }
    }
}
