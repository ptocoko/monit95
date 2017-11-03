using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class RsurReportFile
    {
        public int Id { get; set; }

        public int RsurReportId { get; set; }

        public int FileId { get; set; }

        public virtual File File { get; set; }

        public virtual RsurReport RsurReport { get; set; }
    }
}
