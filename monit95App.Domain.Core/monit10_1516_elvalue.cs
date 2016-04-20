namespace monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class monit10_1516_elvalue
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int LearnerID { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public short DiagNumber { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(50)]
        public string ElCode { get; set; }

        public double ElValue { get; set; }
    }
}
