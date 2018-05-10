using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.QuestionProtocol
{
    public class QuestionProtocolDto
    {
        public string ParticipFIO { get; set; }
        public string TestName { get; set; }

        public IEnumerable<QuestionMarkDto> QuestionMarks { get; set; }
    }

    public class QuestionMarkDto
    {
        public int QuestionId { get; set; }

        public int? CurrentMark { get; set; }

        public string Name { get; set; }

        public int MaxMark { get; set; }
    }
}
