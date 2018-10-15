using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class TwoThreeResultsMarks
    {
        public int Id { get; set; }
        public int ResultId { get; set; }
        public int AwardedMark { get; set; }
        public int MaxMark { get; set; }
        public int QuestionOrder { get; set; }
    }
}
