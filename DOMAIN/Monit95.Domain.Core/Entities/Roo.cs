namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Roo")]
    public partial class Roo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int GoverCode { get; set; }

        [Required]
        [StringLength(150)]
        public string GoverName { get; set; }

        [StringLength(200)]
        public string GoverFullName { get; set; }

        [StringLength(200)]
        public string GoverAddress { get; set; }

        [StringLength(50)]
        public string GoverPhone { get; set; }

        [StringLength(50)]
        public string GoverEmail { get; set; }

        [StringLength(50)]
        public string GoverWWW { get; set; }

        public int GoverDirectID { get; set; }

        [Column("ФИО оператора")]
        [StringLength(100)]
        public string ФИО_оператора { get; set; }

        [Column("ФИО координатора")]
        [StringLength(100)]
        public string ФИО_координатора { get; set; }

        public virtual RooDirect RooDirect { get; set; }

        public virtual Roo Roo1 { get; set; }

        public virtual Roo Roo2 { get; set; }
    }
}
