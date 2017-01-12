using Monit95App.Services.Work.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Abstract
{
    public class SRmodel<T> where T : LRmodel //SchoolReportModel
    {
        public string SchoolName { get; set; }
        public string AreaName { get; set; }

        public List<T> LearnerReports { get; set; }
    }
}
