using Monit95App.Services.Rsur.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Rsur.Interfaces
{
    public interface IRsurParticipEditService
    {
        List<RsurParticipEditModel> GetModels();
        void AddModel(RsurParticipEditModel model);
    }
}
