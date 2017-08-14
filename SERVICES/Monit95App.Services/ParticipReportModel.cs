using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Report
{
    public class ParticipReportModel
    {
        public string ParticipCode { get; set; }
        public string ParticipSNS { get; set; }
        public DateTime TestDate { get; set; }

        #region Marks
        public string Marks { get; set; }
        public double PrimaryMark { get; set; }
        public short Mark5 { get; set; }
        #endregion
        public List<double> Parts { set; get; } = new List<double>();
        public List<double> Elements { set; get; } = new List<double>();

    }
}
