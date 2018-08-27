using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public class ParticipGetDto
    {
        public int Id { get; set; }

        public string Surname { get; set; }

        public string Name { get; set; }

        public string SecondName { get; set; }

        public DateTime? Birthday { get; set; }

        public string ClassName { get; set; }

        public string ClassId { get; set; }

        public bool? WasDoo { get; set; }
    }

    public class ParticipList
    {
        public IEnumerable<ParticipGetDto> Items { get; set; }
        public int TotalCount { get; set; }
        public IEnumerable<ClassDto> Classes { get; set; }
    }
}
