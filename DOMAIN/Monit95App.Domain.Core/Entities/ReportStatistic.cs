namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ReportStatistic
    {
        public Guid Id { get; set; }

        public int ReportId { get; set; }

        [Required]
        public string UserName { get; set; }

        public DateTime Date { get; set; }

        public virtual Report Report { get; set; }
    }
}
