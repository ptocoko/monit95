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

        public int ProjectTestId { get; set; }

        public int ParticipId { get; set; }

        public virtual Particip Particip { get; set; }

        public virtual ProjectTest ProjectTest { get; set; }

        public virtual Result Result { get; set; }
    }
}
