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
    
    public partial class ParticipTest
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ParticipTest()
        {
            this.TestResults = new HashSet<TestResult>();
        }
    
        public int Id { get; set; }
        public int ProjectCode { get; set; }
        public string ParticipCode { get; set; }
        public int ProjectTestId { get; set; }
        public int Was { get; set; }
    
        public virtual ProjectParticip ProjectParticip { get; set; }
        public virtual ProjectTest ProjectTest { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TestResult> TestResults { get; set; }
    }
}
