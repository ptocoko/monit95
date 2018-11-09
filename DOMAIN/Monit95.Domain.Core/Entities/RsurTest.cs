namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class RsurTest
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public RsurTest()
        {
            RsurParticipTests = new HashSet<RsurParticipTest>();
        }

        public int Id { get; set; }

        public Guid TestId { get; set; }

        public int? TestNumber { get; set; }

        [Column(TypeName = "date")]
        public DateTime TestDate { get; set; }

        public bool IsOpen { get; set; }

        [StringLength(255)]
        public string Note { get; set; }

        /// <summary>
        /// Название диагностики        
        /// </summary>
        /// <example>"Октябрь-2017" | "Декабрь-2017"</example>
        public string ExamName { get; set; }

        public string ExamCode { get; set; }

        public int? ProjectId { get; set; }

        public bool? IsShown { get; set; }

        public virtual Project Project { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RsurParticipTest> RsurParticipTests { get; set; }

        public virtual Test Test { get; set; }
    }
}
