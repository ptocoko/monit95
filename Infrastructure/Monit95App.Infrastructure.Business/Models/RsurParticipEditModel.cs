using System.ComponentModel.DataAnnotations;

namespace Monit95App.Infrastructure.Business.Protocols
{
    public class RsurParticipEditModel
    {
        [Required]
        public string ParticipCode { get; set; }

        [Required]
        public string ParticipSurname { get; set; }

        [Required]
        public string ParticipName { get; set; }

        public string ParticipSecondName { get; set; }
    }
}
