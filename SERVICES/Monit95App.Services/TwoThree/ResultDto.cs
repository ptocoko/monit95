using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.TwoThree
{
    public class ResultDto
    {
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        public string SchoolId { get; set; }

        public int PrimaryMark { get; set; }
        public string Marks { get; set; }
        public int[] MarksArray { get; set; }
        public string TestCode { get; set; }
        public int Grade5 { get; set; }
        public string GradeString { get; set; }
        public string Years { get; set; }
        public short? OptionNumber { get; set; }
    }
}
