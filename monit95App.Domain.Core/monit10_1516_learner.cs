namespace monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class monit10_1516_learner
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public monit10_1516_learner()
        {
            monit10_1516_rating = new HashSet<monit10_1516_rating>();
        }

        [Key]
        public int LearnerID { get; set; }

        [StringLength(255)]
        public string Oge15ID { get; set; }

        [Required]
        [StringLength(50)]
        public string SchoolID { get; set; }

        [Required]
        [StringLength(20)]
        public string surname { get; set; }

        [Required]
        [StringLength(20)]
        public string name { get; set; }

        [StringLength(20)]
        public string SecondName { get; set; }

        [Required]
        [StringLength(10)]
        public string ClassName { get; set; }

        public virtual school school { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<monit10_1516_rating> monit10_1516_rating { get; set; }
    }
}
