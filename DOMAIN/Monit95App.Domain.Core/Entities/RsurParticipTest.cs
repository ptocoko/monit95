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

        public int RsurTestId { get; set; }

        public int RsurParticipCode { get; set; }

        [StringLength(12)]
        public string RsurParticipOldCode { get; set; }

        public virtual RsurParticip RsurParticip { get; set; }

        public virtual RsurTest RsurTest { get; set; }

        public virtual RsurTestResult RsurTestResult { get; set; }
    }
}
