using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.FirstClass.Dtos
{
    public class QuestionResultDto
    {
        public string Name { get; set; }
        public int MaxMark { get; set; }
        public double Step { get; set; }
        public double? CurrentMark { get; set; }
    }
}
