//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    
    public partial class School
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public School()
        {
            this.CollectorSchools = new HashSet<CollectorSchool>();
            this.GiaResults = new HashSet<GiaResult>();
            this.ProjectParticips = new HashSet<ProjectParticip>();
            this.ProjectParticipsV2 = new HashSet<ProjectParticipsV2>();
        }
    
        public string Id { get; set; }
        public string VprCode { get; set; }
        public Nullable<int> GiaCode { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Director { get; set; }
        public string Phone { get; set; }
        public string Admin { get; set; }
        public string AdminPhone { get; set; }
        public string Email { get; set; }
        public int AreaCode { get; set; }
        public Nullable<int> TypeCode { get; set; }
        public Nullable<int> ViewCode { get; set; }
        public Nullable<int> TownTypeId { get; set; }
        public Nullable<int> GoverCode { get; set; }
        public string ReportLink { get; set; }
        public Nullable<int> PropertyTypeCode { get; set; }
        public string Monit95Login { get; set; }
    
        public virtual Area Area { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CollectorSchool> CollectorSchools { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GiaResult> GiaResults { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProjectParticip> ProjectParticips { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProjectParticipsV2> ProjectParticipsV2 { get; set; }
        public virtual TownType TownType { get; set; }
    }
}
