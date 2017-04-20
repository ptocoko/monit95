using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO
{
    public class ExerciseMarkDto
    {
        public int Id { get; set; }
        public int ProjectParticipId { get; set; }
        public Guid TestId { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassName { get; set; }
        public string Marks { get; set; }        
    }
}
