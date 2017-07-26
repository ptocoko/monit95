using System.Collections.Generic;
using Monit95App.Services.Models.Rsur;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurParticipEditService
    {
        List<RsurParticipEditModel> GetModels();
        bool AddModel(RsurParticipEditModel model);
        bool DeleteModel(string participCode);
    }
}
