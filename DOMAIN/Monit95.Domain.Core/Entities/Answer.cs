namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Answer")]
    public partial class Answer
    {
        public int Id { get; set; }

        public int Number { get; set; }

        [Required]
        [StringLength(100)]
        public string Text { get; set; }

        public int QuestionId { get; set; }

        public bool IsCorrect { get; set; }
    }
}
