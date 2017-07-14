using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Business.Models;

namespace Monit95App.Infrastructure.Business.Interfaces.Rsur
{
    public interface IRsurParticipEditService
    {
        List<RsurParticipEditModel> GetModels();
        bool AddModel(RsurParticipEditModel model);
        bool DeleteModel(string participCode);
    }
}
