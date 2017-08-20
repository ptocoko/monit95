using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Monit95App.Services.Models
{
    public class ParticipDto
    {        
        [Required]
        public int ProjectCode { get; set; }        

        [Required]
        [StringLength(50, MinimumLength = 4)]
        public string Surname { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [StringLength(4)]
        public string SchoolId { get; set; }
                
        [StringLength(2)]
        public string ClassName { get; set; }

        public int Id { get; set; }
        public string SecondName { get; set; }

    }
}