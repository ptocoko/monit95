namespace monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("school")]
    public partial class school
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public school()
        {
            monit10_1516_learner = new HashSet<monit10_1516_learner>();
            monit10_1516_planoo = new HashSet<monit10_1516_planoo>();
        }

        [StringLength(50)]
        public string SchoolID { get; set; }

        public string SchoolName { get; set; }

        public string SchoolFullName { get; set; }

        public short? SchoolCode { get; set; }

        [StringLength(200)]
        public string SchoolAddress { get; set; }

        [StringLength(100)]
        public string SchoolDirector { get; set; }

        [StringLength(50)]
        public string SchoolPhone { get; set; }

        [StringLength(100)]
        public string SchoolAdmin { get; set; }

        [StringLength(50)]
        public string SchoolAdminPhone { get; set; }

        [StringLength(50)]
        public string SchoolEmail { get; set; }

        public int AreaID { get; set; }

        public int? GoverCode { get; set; }

        public int? SchoolTypeCode { get; set; }

        public int TownTypeCode { get; set; }

        public int? SchoolViewCode { get; set; }

        public virtual area area { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<monit10_1516_learner> monit10_1516_learner { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<monit10_1516_planoo> monit10_1516_planoo { get; set; }
    }
}
