namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class TestResultsV2
    {
        public int Id { get; set; }

        public int ExerciseMarkId { get; set; }

        public int Grade5 { get; set; }

        [StringLength(100)]
        public string Elements { get; set; }

        [StringLength(100)]
        public string Skills { get; set; }

        [StringLength(100)]
        public string Parts { get; set; }

        public virtual ExerciseMark ExerciseMark { get; set; }
    }
}
