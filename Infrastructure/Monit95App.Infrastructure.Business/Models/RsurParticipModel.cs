using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Monit95App.Infrastructure.Business.Models
{
    public class RsurParticipModel
    {
        [Required]
        public int ProjectCode { get; set; }

        [Required]
        public string ParticipCode { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Name { get; set; }

        public string SecondName { get; set; }

        [Required]
        public string SubjectName { get; set; }

        [Required]
        public string SchoolIdWithName { get; set; }

        [Required]
        public string CategName { get; set; }

        public int? Experience { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public DateTime? Birthday { get; set; }

        public string ClassNumbers { get; set; }

        public bool HasRequestToEdit { get; set; }
    }
}