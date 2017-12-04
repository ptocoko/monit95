namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("KimQuestion")]
    public partial class KimQuestion
    {
        public int Id { get; set; }

        public int QuestionNumber { get; set; }

        public int QuestionId { get; set; }

        public int KimNumber { get; set; }

        public virtual Kim Kim { get; set; }
    }
}
