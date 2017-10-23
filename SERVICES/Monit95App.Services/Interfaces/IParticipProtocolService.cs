using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IParticipProtocolService
    {
        IList<IGrouping<string, Domain.Core.Entities.RsurTestResult>> GetTestResultsGroupByParticipCode(string testIdStr, DateTime? testDate = null);
        IList<ParticipProtocol> CreateReportModel(IList<IGrouping<string, Domain.Core.Entities.RsurTestResult>> resultsGroupByParticipCode);
    }
}
