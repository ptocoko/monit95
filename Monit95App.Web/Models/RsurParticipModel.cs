using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class RsurParticipModel
    {
        public int ProjectCode { get; set; }
        public string ParticipCode { get; set; } 
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string SubjectName { get; set; }
        public string SchoolIdWithName { get; set; }
        public string CategName { get; set; }
        public int? Experience { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime? Birthday { get; set; }
        public string ClassNumbers { get; set; }
        public bool HasRequestToEdit { get; set; }
    }
}