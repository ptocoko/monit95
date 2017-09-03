namespace Monit95App.Services.DTOs
{
    using System.ComponentModel.DataAnnotations;

    public class RsurParticipPutDto
    {       
        [Required]
        [Range(0, 1)]
        public int ActualCode { get; set; }                
    }
}