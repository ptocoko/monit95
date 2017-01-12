using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Work.Concrete
{
    public class LearnerOnlineReport
    {
        public Learner LearnerInfo { get; set; }
        public string Link { get; set; }

        public LearnerOnlineReport()
        {
            LearnerInfo = new Learner();
        }
    }
}
