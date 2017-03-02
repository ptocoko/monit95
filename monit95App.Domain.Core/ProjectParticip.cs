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
    
    public partial class ProjectParticip
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ProjectParticip()
        {
            this.ParticipTests = new HashSet<ParticipTest>();
            this.TestResults = new HashSet<TestResult>();
        }
    
        public int ProjectCode { get; set; }
        public string ParticipCode { get; set; }
        public string SchoolId { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public int NSubjectCode { get; set; }
        public Nullable<int> CategId { get; set; }
        public Nullable<int> Experience { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    
        public virtual Category Category { get; set; }
        public virtual NsurSubject NsurSubject { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ParticipTest> ParticipTests { get; set; }
        public virtual School School { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TestResult> TestResults { get; set; }
    }
}
