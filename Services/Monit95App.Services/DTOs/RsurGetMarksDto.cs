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
        public string Fio { get; set; }
        public string TestNumberCodeWithName { get; set; }
        public string[] MarkNames { get; set; }

        //regex to post marks is in url https://regex101.com/r/bFbiec/1
        public string Marks { get; set; }
    }
}
