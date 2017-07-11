using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Models
{
    public class ParticipResultsModel
    {
        public string SubjectName { get; set; }
        public DateTime TestDate { get; set; }
        public string Marks { get; set; }
        public int Grade5 { get; set; }
        public string TestId { get; set; }
        public string NumberCode { get; set; }
        public bool ReportExisting { get; set; }
    }
}
