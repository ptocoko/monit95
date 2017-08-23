namespace Monit95App.Domain.Core.Entities
{
    using Abstract;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class ProjectParticip : Person
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProjectParticip()
        {
            ParticipTests = new HashSet<ParticipTest>();
        }

        [Key]
        [StringLength(12)]
        public string ParticipCode { get; set; }

        [Required]
        [StringLength(4)]
        public string SchoolId { get; set; }

        public int NSubjectCode { get; set; }

        public int CategId { get; set; }

        public int? Experience { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        public DateTime? Birthday { get; set; }

        [StringLength(30)]
        public string ClassNumbers { get; set; }

        public int ProjectCode { get; set; }

        public virtual Category Category { get; set; }

        public virtual NsurSubject NsurSubject { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ParticipTest> ParticipTests { get; set; }

        public virtual ProjectParticipEdit ProjectParticipEdit { get; set; }

        public virtual Project Project { get; set; }

        public virtual School School { get; set; }
    }
}
