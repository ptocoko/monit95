using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.Models
{
    public class ParticipResultsViewModel
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