using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Services.Models;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurParticipViewer
    {
        RsurParticipBaseInfo CreateModel(RsurParticip entity);
        ParticipResultsModel CreateResultModel(RsurTestResult entity, string participCode);
    }
}
