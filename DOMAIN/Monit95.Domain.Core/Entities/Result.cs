namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Result
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ParticipTestId { get; set; }

        [Required]
        [StringLength(160)]
        public string Marks { get; set; }

        public double? PrimaryMark { get; set; }

        public int? Grade5 { get; set; }

        [StringLength(75)]
        public string ElementValues { get; set; }

        public virtual ParticipTest ParticipTest { get; set; }
    }
}
