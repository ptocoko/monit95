using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Models.Abstarct
{
    public interface IRsurParticipViewer
    {
        RsurParticipModel CreateViewModel(ProjectParticip entity);
        ParticipResultsViewModel CreateResultViewModel(TestResult entity, string participCode);
    }
}
