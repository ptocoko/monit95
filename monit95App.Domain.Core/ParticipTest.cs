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
            this.ExerMarks = new HashSet<ExerMark>();
        }
    
        public int ProjectCode { get; set; }
        public System.Guid TestId { get; set; }
        public int TestNumber { get; set; }
        public System.DateTime TestDate { get; set; }
        public string ParticipCode { get; set; }
        public bool IsWas { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ExerMark> ExerMarks { get; set; }
        public virtual ProjectParticip ProjectParticip { get; set; }
        public virtual ProjectTest ProjectTest { get; set; }
    }
}
