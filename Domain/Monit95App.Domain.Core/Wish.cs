namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Wish
    {
        public int Id { get; set; }

        [Required]
        [StringLength(4)]
        public string UserId { get; set; }

        [Required]
        public string Message { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
    }
}
