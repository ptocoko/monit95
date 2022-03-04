using Monit95App.Domain.Core.Abstract;
using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.Particips
{
    public class ParticipDto : Person
    {
        public int Id { get; set; }
        public string ClassName { get; set; }

        [Required]
        public string ClassId { get; set; }
    }

    public class ParticipList
    {
        public IEnumerable<ParticipDto> Items { get; set; }
        public int TotalCount { get; set; }
        public IEnumerable<ClassDto> Classes { get; set; }
    }
}
