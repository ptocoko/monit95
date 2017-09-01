namespace Monit95App.Domain.Core.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Particip
    {
        public int Id { get; set; }
        
        public int ProjectId { get; set; }

        [Required]
        [StringLength(25)]
        public string Surname { get; set; }

        [Required]
        [StringLength(25)]
        public string Name { get; set; }

        [StringLength(25)]
        public string SecondName { get; set; }

        [Required]
        [StringLength(4)]
        public string SchoolId { get; set; }

        [Required]
        [StringLength(4)]
        public string ClassId { get; set; }

        public virtual Class Class { get; set; }

        public virtual Project Project { get; set; }

        public virtual School School { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ParticipTest> ParticipTests { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Particip()
        {
            ParticipTests = new HashSet<ParticipTest>();
        }
    }
}
