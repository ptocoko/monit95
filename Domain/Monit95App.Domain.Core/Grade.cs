namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Grade
    {
        public int Id { get; set; }

        public Guid TestId { get; set; }

        public int Grade5 { get; set; }

        [Required]
        [StringLength(100)]
        public string Describe { get; set; }

        public virtual Test Test { get; set; }
    }
}
