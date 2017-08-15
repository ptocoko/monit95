namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TestExercises")]
    public partial class TestExercis
    {
        public int Id { get; set; }

        public Guid TestId { get; set; }

        public int? Number { get; set; }

        [Required]
        [StringLength(5)]
        public string Name { get; set; }

        public int MaxMark { get; set; }

        public virtual Test Test { get; set; }
    }
}
