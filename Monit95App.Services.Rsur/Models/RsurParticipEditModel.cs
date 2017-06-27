using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur.Models
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
