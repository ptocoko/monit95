using Monit95App.Domain.Core.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public class ParticipPostDto : Person
    {
        public int? Id { get; set; }

        //[Required]
        //public string Surname { get; set; }

        //[Required]
        //public string Name { get; set; }

        //public string SecondName { get; set; }

        [Required]
        public DateTime Birthday { get; set; }

        [Required]
        public bool WasDoo { get; set; }

        [Required, StringLength(4, MinimumLength = 4)]
        public string ClassId { get; set; }
    }
}
