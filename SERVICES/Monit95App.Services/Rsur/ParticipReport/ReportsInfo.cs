using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ReportsInfo
    {
        public IEnumerable<string> SchoolNames { get; set; }

        public IEnumerable<string> TestNames { get; set; }

        public IEnumerable<string> ExamNames { get; set; }
    }
}
