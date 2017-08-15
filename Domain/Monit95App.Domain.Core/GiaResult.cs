namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class GiaResult
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProjectId { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(255)]
        public string ParticipId { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int SubjectCode { get; set; }

        [Required]
        [StringLength(100)]
        public string Surname { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(100)]
        public string SecondName { get; set; }

        [Required]
        [StringLength(50)]
        public string DocumNum { get; set; }

        [Required]
        [StringLength(4)]
        public string SchoolId { get; set; }

        public int PrimaryMark { get; set; }

        public int Grade5 { get; set; }

        public int? Grade100 { get; set; }

        [StringLength(255)]
        public string Marks { get; set; }

        [StringLength(255)]
        public string Parts { get; set; }

        [StringLength(255)]
        public string Elements { get; set; }

        [StringLength(255)]
        public string Skills { get; set; }

        public virtual Project Project { get; set; }

        public virtual School School { get; set; }
    }
}
