using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Models
{
    public class ParticipProtocol
    {     
        public string ParticipCode { get; set; }
        public string FullName { get; set; }
        public string SchoolName { get; set; }
        public string TestName { get; set; }
        public string TestDate { get; set; }

        public ICollection<MarkResultModel> MarkResultModels { get; set; }
        public ICollection<ElementResultModel> ElementResultModels { get; set; }
    }
}
