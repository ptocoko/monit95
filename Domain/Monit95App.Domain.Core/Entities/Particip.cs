namespace Monit95App.Domain.Core.Entities
{
    using Monit95App.Domain.Core.Abstract;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public class Particip : Person
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Particip()
        {
            // ReSharper disable once VirtualMemberCallInConstructor
            ExerciseMarks = new HashSet<ExerciseMark>();
        }

        public int Id { get; set; }

        public int ProjectCode { get; set; }

        [Required]
        [StringLength(4)]
        public string SchoolId { get; set; }

        [Required]
        [StringLength(4)]
        public string ClassCode { get; set; }

        public virtual Class Class { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ExerciseMark> ExerciseMarks { get; set; }

        public virtual School School { get; set; }
    }
}
