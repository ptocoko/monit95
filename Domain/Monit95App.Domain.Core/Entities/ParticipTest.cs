namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ParticipTest
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ParticipTest()
        {
            TestResults = new HashSet<Result>();
        }

        public int Id { get; set; }

        public int ProjectTestId { get; set; }

        public int ParticipId { get; set; }

        public virtual Particip Particip { get; set; }

        public virtual ProjectTest ProjectTest { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Result> TestResults { get; set; }
    }
}
