using Monit95App.Domain.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.SchoolsProfile
{
    public class ProfileQuestionDto : ProfileQuestion
    {
        public Dictionary<string, int?> SessionValues { get; set; }
        public int? Value { get; set; }
    }
}
