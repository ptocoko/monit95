namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Test
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Test()
        {
            Elements = new HashSet<Element>();
            ExerciseMarks = new HashSet<ExerciseMark>();
            Grades = new HashSet<Grade>();
            ProjectTests = new HashSet<ProjectTest>();
            TestExercises = new HashSet<TestExercis>();
        }

        public Guid Id { get; set; }

        [StringLength(10)]
        public string NumberCode { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string FullName { get; set; }

        [StringLength(50)]
        public string ExcerMaxMarks { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Element> Elements { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ExerciseMark> ExerciseMarks { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Grade> Grades { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProjectTest> ProjectTests { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TestExercis> TestExercises { get; set; }
    }
}
