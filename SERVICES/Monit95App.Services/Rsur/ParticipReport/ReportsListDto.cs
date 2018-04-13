using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ReportsListDto
    {
        public IEnumerable<ParticipReport> Items { get; set; }

        public int TotalCount { get; set; }
    }
}
