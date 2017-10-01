namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class RsurParticip
    {
        [Key]
        public int Code { get; set; }

        [StringLength(12)]
        public string OldCode { get; set; }

        [Required]
        [StringLength(4)]
        public string SchoolId { get; set; }

        [Required]
        [StringLength(25)]
        public string Surname { get; set; }

        [Required]
        [StringLength(25)]
        public string Name { get; set; }

        [StringLength(25)]
        public string SecondName { get; set; }

        public int RsurSubjectCode { get; set; }

        public int CategoryId { get; set; }

        public int Experience { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        public DateTime? Birthday { get; set; }

        [StringLength(30)]
        public string ClassNumbers { get; set; }

        public short ActualCode { get; set; }

        [StringLength(4)]
        public string SchoolIdFrom { get; set; }

        public DateTime? AddedDate { get; set; }

        public virtual Category Category { get; set; }

        public virtual RsurParticip RsurParticips1 { get; set; }

        public virtual RsurParticip RsurParticip1 { get; set; }

        public virtual RsurSubject RsurSubject { get; set; }

        public virtual School School { get; set; }

        public virtual School School1 { get; set; }
    }
}
