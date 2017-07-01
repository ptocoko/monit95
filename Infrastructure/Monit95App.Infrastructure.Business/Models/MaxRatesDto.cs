using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Protocols
{
    public class MaxRatesDto
    {
        public string TestId { get; set; }
        public string[] MaxRates { get; set; }
    }
}
