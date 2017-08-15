namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Report
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string ProjectName { get; set; }

        [Required]
        [StringLength(9)]
        public string Year { get; set; }

        public DateTime? Date { get; set; }

        public string Available { get; set; }

        public short? TypeCode { get; set; }
    }
}
