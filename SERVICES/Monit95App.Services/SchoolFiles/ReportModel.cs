using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.SchoolFiles
{
    public class ReportModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ProjectName { get; set; }
        public string Link { get; set; }
        public DateTime? Date { get; set; }
        public string Year { get; set; }
        public bool IsGot { get; set; }
        public bool IsShow { get; set; } = false;
    }
}
