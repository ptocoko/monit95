namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ProjectTest
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProjectTest()
        {
            ParticipTests = new HashSet<ParticipTest>();
        }

        public int Id { get; set; }

        public int ProjectCode { get; set; }

        public Guid TestId { get; set; }

        public int TestNumber { get; set; }

        [Column(TypeName = "date")]
        public DateTime TestDate { get; set; }

        public bool IsOpened { get; set; }

        [StringLength(255)]
        public string Note { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ParticipTest> ParticipTests { get; set; }

        public virtual Project Project { get; set; }

        public virtual Test Test { get; set; }
    }
}
