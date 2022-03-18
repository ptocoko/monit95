using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class VprWeekSchool
    {
        public int Id { get; set; }
        public string SchoolId { get; set; }
        public int WeekId { get; set; }
        public string SubjectCode { get; set; }
        public string ClassNumber { get; set; }
        public bool HasError { get; set; }
        public bool IsSecond { get; set; }

        public virtual School School { get; set; }
        public virtual VprWeek Week { get; set; }
        public virtual ICollection<VprSchoolMarks> VprSchoolMarks { get; set; } = new HashSet<VprSchoolMarks>();
        public bool AbleSendSecond { get; set; }
    }
}
