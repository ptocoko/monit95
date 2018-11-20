using Monit95App.Domain.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.ItakeEge.Report
{
    public class ReportsListDto
    {
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public IEnumerable<ReportItem> Items { get; set; }
    }

    public class ReportItem: Person
    {
        public int Id { get; set; }
        public int ParticipTestId { get; set; }
        public string TestCode { get; set; }
        public string TestName { get; set; }
        public int Grade5 { get; set; }
    }
}
