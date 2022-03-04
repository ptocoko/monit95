using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Abstract
{
    public class ElementResultDto
    {
        public string ElementNumber { get; set; }
        public IEnumerable<int> QuestionNumbers { get; set; }
        public string Name { get; set; }
        public double? Value { get; set; }
    }
}
