using System.Collections.Generic;
using Monit95App.Services.Rsur;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurParticipEditService
    {
        IEnumerable<RsurParticipEditModel> GetAll();
        bool AddModel(RsurParticipEditModel model);
        void Apply(string participCode);        
    }
}
