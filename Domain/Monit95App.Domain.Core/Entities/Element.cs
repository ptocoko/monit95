namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Element
    {
        public int Id { get; set; }

        public Guid TestId { get; set; }

        [Required]
        [StringLength(50)]
        public string Code { get; set; }

        [Required]
        [StringLength(500)]
        public string Name { get; set; }

        public int ElementTypeId { get; set; }

        [Required]
        [StringLength(50)]
        public string ExerNames { get; set; }

        public virtual ElementType ElementType { get; set; }

        public virtual Test Test { get; set; }
    }
}
