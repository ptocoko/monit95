namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ParticipTest
    {
        public int Id { get; set; }

        [Required]
        [StringLength(12)]
        public string ParticipCode { get; set; }

        public int ProjectTestId { get; set; }

        public int ProjectCode { get; set; }

        public virtual ProjectParticip ProjectParticip { get; set; }

        public virtual ProjectTest ProjectTest { get; set; }

        public virtual TestResult TestResult { get; set; }
    }
}
