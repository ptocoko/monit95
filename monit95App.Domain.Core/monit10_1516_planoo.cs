namespace monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class monit10_1516_planoo
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(50)]
        public string ElCode { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string SchoolID { get; set; }

        public int? CountHours { get; set; }

        [Column(TypeName = "date")]
        public DateTime? HoursDateStart { get; set; }

        [Column(TypeName = "date")]
        public DateTime? HoursDateEnd { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ExamDate { get; set; }

        public virtual monit10_1516_el monit10_1516_el { get; set; }

        public virtual school school { get; set; }
    }
}
