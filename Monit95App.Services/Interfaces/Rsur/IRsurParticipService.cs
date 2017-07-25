using Monit95App.Services.Models;
using Monit95App.Services.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces.Rsur
{
    public interface IRsurParticipService
    {
        IEnumerable<RsurParticipBaseInfo> GetByUserName(string userName, string userRoles);
        RsurParticipBaseInfo GetByParticipCode(string participCode);
        bool Update(RsurParticipBaseInfo model);
        void Add(RsurParticipBaseInfo model);
        IEnumerable<IGrouping<string, ParticipResultsModel>> GetParticipResults(string participCode);

        Task<IEnumerable<RsurParticipBaseInfo>> GetTask(int? areaCode, string schoolId);
    }
}
