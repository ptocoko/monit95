using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.ItakeEge.QuestionProtocol
{
    public class PostDto
    {
        public short? OptionNumber { get; set; }
        public Dictionary<int, double> MarksDict { get; set; }
    }
}
