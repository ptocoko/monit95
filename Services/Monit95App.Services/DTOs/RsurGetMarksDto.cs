using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTOs
{
    public class RsurGetMarksDto
    {
        public int ParticipTestId { get; set; }
        public int Code { get; set; }
        public string TestNumberCodeWithName { get; set; }
        public string[] MarkNames { get; set; }

        public string Marks { get; set; }
    }
}
