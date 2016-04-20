namespace monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class monit10_1516_el
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public monit10_1516_el()
        {
            monit10_1516_planoo = new HashSet<monit10_1516_planoo>();
            monit10_1516_rating = new HashSet<monit10_1516_rating>();
        }

        [Key]
        [StringLength(50)]
        public string ElCode { get; set; }

        [Required]
        [StringLength(100)]
        public string TaskNumOge15 { get; set; }

        [Required]
        [StringLength(200)]
        public string ElName { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<monit10_1516_planoo> monit10_1516_planoo { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<monit10_1516_rating> monit10_1516_rating { get; set; }
    }
}
