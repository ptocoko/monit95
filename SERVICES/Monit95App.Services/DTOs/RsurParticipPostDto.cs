namespace Monit95App.Services.DTOs
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class RsurParticipPostDto
    {        
        [StringLength(25)]
        public string Surname { get; set; }
        
        [StringLength(25)]
        public string Name { get; set; }

        [StringLength(25)]
        public string SecondName { get; set; }
        
        public int RsurSubjectCode { get; set; }
        
        public int CategId { get; set; }
                
        public int Experience { get; set; }

        [Required]
        [StringLength(11)] // e.g.: 89280168396
        public string Phone { get; set; }
                        
        public string Email { get; set; } // TODO: validate by MailAdress        

        [Required]
        public DateTime Birthday { get; set; } // TODO: custome attrinute to avoid most older teacher

        [Required]
        public string ClassNumbers { get; set; } // TODO: need custom attribute to avoide repetion class's numbers
                        
        public string SchoolId { get; set; }
        
        public string SchoolIdFrom { get; set; }  // null - new teacher:
    }
}
