namespace Monit95App.Services.DTOs
{
    using System.ComponentModel.DataAnnotations;

    public class RsurParticipPutDto
    {       
        [Required]
        [Range(0, 3)]
        public int ActualCode { get; set; }                
    }
}