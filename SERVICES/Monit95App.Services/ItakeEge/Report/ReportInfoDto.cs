using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.ItakeEge.Report
{
    public class ReportInfoDto
    {
        public IEnumerable<TestDto> Tests { get; set; }
        public IEnumerable<SchoolDto> Schools { get; set; }
    }
}
