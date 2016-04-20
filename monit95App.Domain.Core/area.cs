namespace monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("area")]
    public partial class area
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public area()
        {
            schools = new HashSet<school>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int AreaID { get; set; }

        [Required]
        [StringLength(50)]
        public string AreaName { get; set; }

        [Required]
        [StringLength(150)]
        public string AreaFullName { get; set; }

        [Column("Административный центр")]
        [Required]
        [StringLength(100)]
        public string Административный_центр { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<school> schools { get; set; }
    }
}
