namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class RsurParticipTest
    {
        public int Id { get; set; }

        [Required]
        [StringLength(12)]
        public string ParticipCode { get; set; }

        public int ProjectTestId { get; set; }

        public int ProjectCode { get; set; }

        public virtual RsurParticip RsurParticip { get; set; }

        public virtual RsurTest RsurTest { get; set; }

        public virtual RsurTestResult RsurTestResult { get; set; }
    }
}
