using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Models.Abstarct
{
    public interface IRsurParticipViewer
    {
        RsurParticipModel CreateModel(ProjectParticip entity);
        ParticipResultsViewModel CreateResultViewModel(TestResult entity, string participCode);
    }
}
