namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class RsurTestResult
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RsurParticipTestId { get; set; }

        [Required]
        [StringLength(255)]
        public string RsurQuestionValues { get; set; }

        [StringLength(255)]
        public string EgeQuestionValues { get; set; }

        public int? Grade5 { get; set; }

        [StringLength(100)]
        public string Parts { get; set; }

        [StringLength(255)]
        public string Elements { get; set; }

        public double? PrimaryMark { get; set; }

        public virtual RsurParticipTest RsurParticipTest { get; set; }
    }
}
