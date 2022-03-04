using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.ItakeEge.Report
{
    public class ReportDto : SchoolParticip
    {
        public int ParticipTestId { get; set; }
        public string TestDateString { get; set; }
        public string TestName { get; set; }
        public string ProjectName { get; set; }
        public string TestStatus { get; set; }
        public int Grade5 { get; set; }
        public int ProjectTestId { get; set; }
        public int PrimaryMark { get; set; }
        public bool IsRiskGroup { get; set; }
        public IEnumerable<MarkDto> Marks { get; set; }
        public IEnumerable<ElementResultDto> ElementsResults { get; set; }
    }
}
