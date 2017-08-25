using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTOs
{
    public class ExerciseMarkDto
    {
        public int Id { get; set; }

        [Required]
        public int ParticipId { get; set; }

        [Required]
        public string TestId { get; set; }

        [RegularExpression(@"((\d;)|(\d,))+(\d)$")]
        public string Marks { get; set; }        
    }
}
