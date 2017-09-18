namespace Monit95App.Services.DTOs
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class RsurParticipPostDto
    {        
        [Required]
        [StringLength(25)]
        public string Surname { get; set; }
        
        [Required]
        [StringLength(25)]
        public string Name { get; set; }

        [StringLength(25)]
        public string SecondName { get; set; }
        
        [Required]
        public int RsurSubjectCode { get; set; }
        
        [Required]
        public int CategoryId { get; set; }
                
        [Required]
        [Range(0, 60)]
        public int Experience { get; set; }

        [Required] // e.g.: 89280168396
        [StringLength(11, MinimumLength = 11)]
        public string Phone { get; set; }
                        
        public string Email { get; set; } // TODO: validate by MailAdress        

        [Required]
        public DateTime Birthday { get; set; } // TODO: custome attrinute to avoid most older teacher

        [Required]
        public string ClassNumbers { get; set; } // TODO: need custom attribute to avoide repetion class's numbers
                       
        [StringLength(4)]
        public string SchoolId { get; set; }
        
        public string SchoolIdFrom { get; set; }  // null - new teacher:
    }
}
