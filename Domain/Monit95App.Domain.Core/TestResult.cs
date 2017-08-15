namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class TestResult
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ParticipTestId { get; set; }

        public double PrimaryMark { get; set; }

        public int Grade5 { get; set; }

        [Required]
        [StringLength(255)]
        public string Marks { get; set; }

        [Required]
        [StringLength(100)]
        public string Parts { get; set; }

        [StringLength(255)]
        public string Elements { get; set; }

        public virtual ParticipTest ParticipTest { get; set; }
    }
}
