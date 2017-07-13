using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Models
{
    public class RsurReportModel
    {
        public DateTime Date { get; set; } //dd.mm.yyyy
        public string Name { get; set; }
        public string UserName { get; set; }
        List<RsurParticipFullInfo> Models { get; set; } = new List<RsurParticipFullInfo>();
    }
}
