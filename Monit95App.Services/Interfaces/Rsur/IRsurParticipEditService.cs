using Monit95App.Services.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces.Rsur
{
    public interface IRsurParticipEditService
    {
        List<RsurParticipEditModel> GetModels();
        bool AddModel(RsurParticipEditModel model);
        bool DeleteModel(string participCode);
    }
}
