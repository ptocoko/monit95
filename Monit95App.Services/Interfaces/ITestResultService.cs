using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface ITestResultService
    {
        ReportsDto SelectParticipsGroupResults(Guid testId, DateTime testDate);        
    }
}
