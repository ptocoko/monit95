using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services.ItakeEge.Participant
{
    public class ParticipPostOrPutDto
    {             
        [Required]
        [StringLength(25, MinimumLength = 4)]
        public string Surname { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 3)]
        public string Name { get; set; }

        public string SecondName { get; set; }

        [Required]
        [Range(1, 999999)]
        public int DocumNumber { get; set; }        
    }
}