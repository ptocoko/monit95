using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Monit95App.Services.Models;
using Monit95App.Services.Models.Rsur;
using Monit95App.Services.Rsur;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurParticipService
    {        
        RsurParticipBaseInfo GetByParticipCode(string participCode);
        RsurParticipFullInfo Update(RsurParticipFullInfo model, bool? isAdmin);
        void Add(RsurParticipBaseInfo model);
        IEnumerable<IGrouping<string, ParticipResultsModel>> GetParticipResults(string participCode);
        IEnumerable<RsurParticipFullInfo> Get(int? areaCode, string schoolId);
        ProjectParticip GetEntity(string participCode);
    }
}

