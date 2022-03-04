namespace Monit95App.Services.DTOs
{
    using System.ComponentModel.DataAnnotations;

    public class RsurParticipPutDto
    {       
        [Required]
        [Range(0, 3)]
        public short ActualCode { get; set; }

        public string SchoolId { get; set; }

        public string SchoolIdFrom { get; set; }
    }
}