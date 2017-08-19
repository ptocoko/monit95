using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Monit95App.Services.Models
{
    public class ParticipModel
    {
        public int Id { get; set; }
        public int ProjectCode { get; set; }
        public string ParticipCode { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 4)]
        public string Surname { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }
        
        [StringLength(50)]
        public string SecondName { get; set; }

        public string SchoolId { get; set; }
        
        
        [StringLength(2)]
        public string ClassName { get; set; }        
    }
}