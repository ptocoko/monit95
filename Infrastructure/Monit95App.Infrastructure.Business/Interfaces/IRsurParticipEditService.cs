using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface IRsurParticipEditService
    {
        List<RsurParticipEditModel> GetModels();
        void AddModel(RsurParticipEditModel model);
        Task DeleteModel(string participCode);
        Task<bool> UpdateModel(RsurParticipEditModel model);
    }
}
