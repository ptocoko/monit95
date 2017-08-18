using System.Collections.Generic;
using Monit95App.Services.Models.Rsur;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurParticipEditService
    {
        List<RsurParticipEditModel> GetModels();
        bool AddModel(RsurParticipEditModel model);
        void Apply(string participCode);        
    }
}
