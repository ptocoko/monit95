using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Business.Models;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface IRsurParticipService
    {
        IEnumerable<RsurParticipBaseModel> GetByUserName(string userName, string userRoles);
        RsurParticipBaseModel GetByParticipCode(string participCode);
        bool Update(RsurParticipBaseModel model);
        void Add(RsurParticipBaseModel model);
        IEnumerable<IGrouping<string, ParticipResultsModel>> GetParticipResults(string participCode);
    }
}
