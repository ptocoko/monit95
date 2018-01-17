namespace Monit95App.Domain.Core.Entities
{
    using System;   
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;    

    [Table("Exercises")]
    public partial class Exercis
    {
        public int Id { get; set; }

        public Guid TestId { get; set; }

        public int? Number { get; set; }

        [Required]
        [StringLength(5)]
        public string Name { get; set; }

        public int MaxMark { get; set; }

        public string Elements { get; set; }

        public string Skills { get; set; }

        public virtual Test Test { get; set; }
    }
}
