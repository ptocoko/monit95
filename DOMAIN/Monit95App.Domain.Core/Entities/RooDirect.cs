namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RooDirect")]
    public partial class RooDirect
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public RooDirect()
        {
            Roos = new HashSet<Roo>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int GoverDirectID { get; set; }

        [Required]
        [StringLength(100)]
        public string SNS { get; set; }

        [StringLength(100)]
        public string Phone { get; set; }

        public int GoverCode { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Roo> Roos { get; set; }

        public virtual RooDirect RooDirect1 { get; set; }

        public virtual RooDirect RooDirect2 { get; set; }
    }
}
