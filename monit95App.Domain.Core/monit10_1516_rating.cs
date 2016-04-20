namespace monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class monit10_1516_rating
    {
        [Key]
        public int RatingID { get; set; }

        public int LearnerID { get; set; }

        [Required]
        [StringLength(50)]
        public string ElCode { get; set; }

        public double ValueOge15 { get; set; }

        public int? RatingValue { get; set; }

        public virtual monit10_1516_el monit10_1516_el { get; set; }

        public virtual monit10_1516_learner monit10_1516_learner { get; set; }
    }
}
