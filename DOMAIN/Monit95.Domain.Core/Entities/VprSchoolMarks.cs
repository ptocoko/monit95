using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class VprSchoolMarks
    {
        public int Id { get; set; }
        public double Marks2 { get; set; }
        public double Marks3 { get; set; }
        public double Marks4 { get; set; }
        public double Marks5 { get; set; }
        public string ClassId { get; set; }
        public int VprWeekSchoolId { get; set; }
        public virtual Class Class { get; set; }    
        public virtual VprWeekSchool VprWeekSchool { get; set; }
    }
}
