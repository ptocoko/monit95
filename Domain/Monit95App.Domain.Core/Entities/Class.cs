using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Domain.Core.Entities
{
    public partial class Class
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Class()
        {
            Particips = new HashSet<Particip>();
        }

        [StringLength(4)]
        public string Id { get; set; }

        [Required]
        [StringLength(5)]
        public string Name { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Particip> Particips { get; set; }
    }
}
