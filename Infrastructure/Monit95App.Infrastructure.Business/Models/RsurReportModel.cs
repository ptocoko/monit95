using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Models
{
    public class RsurReportModel
    {
        public DateTime ReportCreatedDate { get; set; } //dd.mm.yyyy
        public string ReportName { get; set; }
        public string UserName { get; set; } //login in www.monit95.ru
        List<RsurParticipFullInfo> Models { get; set; } = new List<RsurParticipFullInfo>();
    }
}
