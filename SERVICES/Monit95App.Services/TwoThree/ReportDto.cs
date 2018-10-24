using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.TwoThree
{
    public class ReportDto
    {
        public int Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string SchoolName { get; set; }
        public string TestCode { get; set; }
        public string AreaName { get; set; }
        public string Marks { get; set; }
        public int PrimaryMark { get; set; }
        public int Grade5 { get; set; }
        public string GradeString { get; set; }
        public int? GiaCode { get; set; }
    }
}
