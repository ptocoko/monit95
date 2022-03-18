using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.VprSchools
{
    public class VprWeekSchoolDto
    {
        public int Id { get; set; }
        public string ClassNumber { get; set; }
        public string SubjectCode { get; set; }
        public bool HasError { get; set; }
        public bool IsSecond { get; set; }
        public bool AbleSendSecond { get; set; }
        public IEnumerable<VprSchoolMarkDto> VprSchoolMarks { get; set; }
    }

    public class VprSchoolMarkDto
    {
        public double Marks2 { get; set; }
        public double Marks3 { get; set; }
        public double Marks4 { get; set; }
        public double Marks5 { get; set; }
        public string ClassId { get; set; }
    }

    public class VprStatisticsDto
    {
        public Dictionary<string, FirstAndSecond> Marks2 { get; set; }
        public Dictionary<string, FirstAndSecond> Marks3 { get; set; }
        public Dictionary<string, FirstAndSecond> Marks4 { get; set; }
        public Dictionary<string, FirstAndSecond> Marks5 { get; set; }
    }

    public class FirstAndSecond
    {
        public string First { get; set; }
        public string Second { get; set; }
    }
}
