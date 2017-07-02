using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface IParticipProtocolService
    {
        IList<IGrouping<string, TestResult>> GetTestResultsGroupByParticipCode(string testIdStr, DateTime? testDate = null);
        IList<ParticipProtocolModel> CreateReportModel(IList<IGrouping<string, TestResult>> resultsGroupByParticipCode);
    }
}
