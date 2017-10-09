using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTOs
{
    public class RsurPostMarksDto : RsurPutMarksDto
    {
        public int RsurParticipTestId { get; set; }
    }
}
