namespace monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Report")]
    public partial class Report
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(50)]
        public string code { get; set; }

        [Key]
        [Column(Order = 1)]
        public string name { get; set; }

        [Key]
        [Column(Order = 2, TypeName = "date")]
        public DateTime date { get; set; }

        [Key]
        [Column(Order = 3)]
        public string path { get; set; } //путь к AreaID

        [Key]
        [Column(Order = 4)]
        [StringLength(50)]
        public string category { get; set; }

        [Key]
        [Column(Order = 5)]
        [StringLength(10)]
        public string year { get; set; }
    }
}
