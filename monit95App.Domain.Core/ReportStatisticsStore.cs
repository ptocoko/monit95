using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core
{
    public class ReportStatisticsStore
    {
        private readonly cokoContext cokoDb = new cokoContext();
        public void Insert(string userName, int reportId)
        {
            cokoDb.ReportStatistics.Add(new ReportStatistic
            {
                UserName = userName,
                ReportId = reportId
            });
            Save();
        }
        public void Save()
        {
            cokoDb.SaveChangesAsync();
        }
    }
}
