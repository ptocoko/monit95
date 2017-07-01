using Monit95App.Domain.Core;
using Monit95App.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Work.Abstract
{
    public interface ITestResultService
    {
        ReportsDto SelectParticipsGroupResults(Guid testId, DateTime testDate);
        List<IGrouping<string, TestResult>> SelectParticipsGroupResults2(Guid testId, DateTime testDate);
    }
}
