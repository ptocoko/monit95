using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public class ParticipPostDto
    {
        public int? Id { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Name { get; set; }

        public string SecondName { get; set; }

        [Required]
        public DateTime Birthday { get; set; }

        [Required]
        public bool WasDoo { get; set; }

        [Required]
        public string ClassId { get; set; }
    }
}
