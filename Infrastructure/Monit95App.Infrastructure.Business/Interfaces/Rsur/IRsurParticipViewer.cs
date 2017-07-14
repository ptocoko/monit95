using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces.Rsur
{
    public interface IRsurParticipViewer
    {
        RsurParticipBaseInfo CreateModel(ProjectParticip entity);
        ParticipResultsModel CreateResultModel(TestResult entity, string participCode);
    }
}
