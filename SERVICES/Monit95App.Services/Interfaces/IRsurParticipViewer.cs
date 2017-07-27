using Monit95App.Domain.Core;
using Monit95App.Services.Models;
using Monit95App.Services.Models.Rsur;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurParticipViewer
    {
        RsurParticipBaseInfo CreateModel(ProjectParticip entity);
        ParticipResultsModel CreateResultModel(TestResult entity, string participCode);
    }
}
