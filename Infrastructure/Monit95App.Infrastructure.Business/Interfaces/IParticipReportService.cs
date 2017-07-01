using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Interfaces
{
    public interface IParticipReportService
    {
        IList<IGrouping<string, TestResult>> GetParticipGroupResults(Guid testId, DateTime? testDate = null);
    }
}
