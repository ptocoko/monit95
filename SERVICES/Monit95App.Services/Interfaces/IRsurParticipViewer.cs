using Monit95App.Domain.Core;
using Monit95App.Services.Models;
using Monit95App.Services.Models.Rsur;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurParticipViewer
    {
        RsurParticipBaseInfo CreateModel(ProjectParticip entity);
        ParticipResultsModel CreateResultModel(TestResult entity, string participCode);
    }
}
