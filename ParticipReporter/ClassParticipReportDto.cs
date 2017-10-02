using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParticipReporter
{
    public class ClassParticipReportDto
    {
        public int ParticipTestId { get; set; }
        public string Fio { get; set; }
        public string ClassName { get; set; }
        public string SchoolName { get; set; }
        public int PrimaryMark { get; set; }
        public string GradeGroup { get; set; }
        public string[] Marks { get; set; }
    }
}
