using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.QuestionProtocol
{
    public class QuestionListDto
    {
        public int ParticipTestId { get; set; }
        public int ParticipId { get; set; }
        public string ParticipFIO { get; set; }
        public string ClassName { get; set; }
        public string Marks { get; set; }
    }
}
