namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class School
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public School()
        {
            GiaResults = new HashSet<GiaResult>();
            Particips = new HashSet<Particip>();
            ProjectParticips = new HashSet<ProjectParticip>();
        }

        [StringLength(4)]
        public string Id { get; set; }

        [StringLength(50)]
        public string VprCode { get; set; }

        public int? GiaCode { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(100)]
        public string Director { get; set; }

        [StringLength(50)]
        public string Phone { get; set; }

        [StringLength(100)]
        public string Admin { get; set; }

        [StringLength(50)]
        public string AdminPhone { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        public int AreaCode { get; set; }

        public int? TypeCode { get; set; }

        public int? ViewCode { get; set; }

        public int TownTypeId { get; set; }

        public int? GoverCode { get; set; }

        [StringLength(255)]
        public string ReportLink { get; set; }

        public int? PropertyTypeCode { get; set; }

        [StringLength(50)]
        public string Monit95Login { get; set; }

        public virtual Area Area { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GiaResult> GiaResults { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Particip> Particips { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProjectParticip> ProjectParticips { get; set; }

        public virtual SchoolEdit SchoolEdit { get; set; }

        public virtual TownType TownType { get; set; }
    }
}
