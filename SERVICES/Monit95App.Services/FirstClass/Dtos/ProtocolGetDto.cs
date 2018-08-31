using Monit95App.Domain.Core.Abstract;
using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public class ProtocolGetDto : Person
    {
        public int ParticipTestId { get; set; }
        public string Marks { get; set; }
        public string ClassName { get; set; }
        public string ClassId { get; set; }
    }

    public class ProtocolsList
    {
        public IEnumerable<ProtocolGetDto> Items { get; set; }

        public int TotalCount { get; set; }

        public IEnumerable<ClassDto> Classes { get; set; }
    }
}
