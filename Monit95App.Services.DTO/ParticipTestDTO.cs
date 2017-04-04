using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO
{
    public class ParticipTestDto
    {
        public int ParticipTestId { get; set; }

        public string FullTestName { get; set; } //e.g. 0101-ОРФОГРАФИЯ, 01-04-2017
        public string ParticipCode { get; set; }
        public string ExerMarks { get; set; } //e.g. 1;1;0;1;0
    }
}
