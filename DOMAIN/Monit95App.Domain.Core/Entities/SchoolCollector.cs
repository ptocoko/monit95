namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SchoolCollector
    {
        public int Id { get; set; }

        public int CollectorId { get; set; }

        [Required]
        [StringLength(4)]
        public string SchoolId { get; set; }

        public bool IsFinished { get; set; }

        public virtual Collector Collector { get; set; }

        public virtual School School { get; set; }
    }
}
