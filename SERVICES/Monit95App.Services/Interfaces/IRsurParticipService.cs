using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Monit95App.Services.Models;
using Monit95App.Services.Rsur;
using Monit95App.Domain.Core;

namespace Monit95App.Services.Interfaces
{
    public interface IRsurParticipService
    {        
        RsurParticipFullInfo GetByParticipCode(string participCode);        
        void Add(RsurParticipBaseInfo model);
        IEnumerable<IGrouping<string, ParticipResultsModel>> GetParticipResults(string participCode);
        IEnumerable<RsurParticipFullInfo> Get(int? areaCode = null, string schoolId = null);
        void FullUpdate(RsurParticipFullInfo fullInfo);
        RsurParticipFullInfo PartUpdate(RsurParticipFullInfo fullInfo);
    }
}

