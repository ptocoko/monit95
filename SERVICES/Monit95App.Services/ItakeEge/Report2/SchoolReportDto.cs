using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.ItakeEge.Report2
{
    public class SchoolReportDto
    {
        public string SchoolId { get; set; }
        public string SchoolName { get; set; }
        public ReportDto Report { get; set; }
    }

    public class ReportDto
    {
        public int Pass { get; set; }
        public int NotPass { get; set; }
        public int Absent { get; set; }
    }
}
