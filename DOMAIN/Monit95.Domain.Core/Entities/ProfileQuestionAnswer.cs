using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class ProfileQuestionAnswer
    {
        public int Id { get; set; }
        public int ProfileQuestionId { get; set; }
        public ProfileQuestion ProfileQuestion { get; set; }
        public string SchoolId { get; set; }
        public School School { get; set; }
        public string Session { get; set; }
        public string Value { get; set; }
    }
}
