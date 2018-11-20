using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.ItakeEge.Report
{
    public class ReportsSearchDto
    {
        public string TestCode { get; set; }
        public string ParticipSearchText { get; set; }
        public int ProjectId { get; set; }
        public int PageSize { get; set; } = 20;
        public int Page { get; set; } = 1;
    }
}
