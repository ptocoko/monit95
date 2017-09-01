namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class RsurParticipEdit
    {
        [Key]
        [StringLength(12)]
        public string ParticipCode { get; set; }

        [StringLength(25)]
        public string Surname { get; set; }

        [StringLength(25)]
        public string Name { get; set; }

        [StringLength(25)]
        public string SecondName { get; set; }

        [StringLength(30)]
        public string ClassNumbers { get; set; }

        [StringLength(4)]
        public string SchoolId { get; set; }

        public int? CategId { get; set; }

        [StringLength(100)]
        public string Phone { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        public int? Experience { get; set; }

        public int? NSubjectCode { get; set; }
    }
}
