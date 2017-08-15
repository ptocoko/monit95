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

        [Required]
        public int ProjectCode { get; set; }

        [Required]            
        public string Surname { get; set; }

        [Required]
        public string Name { get; set; }

        public string SecondName { get; set; }

        [Required]
        public string SchoolId { get; set; }

        [Required]
        public string ClassName { get; set; }        
    }
}