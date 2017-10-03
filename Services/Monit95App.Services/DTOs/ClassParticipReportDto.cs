using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTOs
{
    public class ClassParticipReportDto
    {
        public int ParticipTestId { get; set; }
        public string Surnane { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string ClassName { get; set; }
        public string SchoolName { get; set; }
        public double? PrimaryMark { get; set; }
        public string GradeGroup { get; set; }
        public string[] Marks { get; set; }
    }
}
