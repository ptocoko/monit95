namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ExerciseMark
    {
        public int Id { get; set; }

        public int ParticipId { get; set; }

        public Guid TestId { get; set; }

        [Required]
        [StringLength(255)]
        public string Marks { get; set; }

        public virtual Particip Particip { get; set; }

        public virtual Test Test { get; set; }

        public virtual TestResultsV2 TestResultsV2 { get; set; }
    }
}
