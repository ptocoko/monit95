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
    
    public partial class TestElement
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TestElement()
        {
            this.ExerElements = new HashSet<ExerElement>();
        }
    
        public System.Guid TestId { get; set; }
        public string ElementCode { get; set; }
        public string ElementName { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ExerElement> ExerElements { get; set; }
        public virtual Test Test { get; set; }
    }
}