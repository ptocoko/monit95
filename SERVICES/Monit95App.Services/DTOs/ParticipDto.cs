using System;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.DTOs
{
    public class ParticipDto
    {        
        [Required]
        public int ProjectId { get; set; }        

        [Required]
        [StringLength(25, MinimumLength = 4)]
        public string Surname { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [StringLength(4)]
        public string SchoolId { get; set; }
                
        [RegularExpression("^([0-9]|10|11)$|^(([0-9]|10|11) [АБВГДЕЖЗИКЛ])$")]
        public string ClassName { get; set; }
        
        public string Birthday { get; set; }

        public bool? WasDoo { get; set; }

        public int Id { get; set; }
        public string SecondName { get; set; }

    }
}