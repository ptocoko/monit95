using System;
using System.Collections.Generic;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public interface IParticipReportService
    {
        ParticipExtendReport GetReport(int rsurParticipTestId);
        IEnumerable<ParticipReport> GetResultsForArea(int areaCode, DateTime testDate);
        IEnumerable<ParticipReport> GetResultsForSchool(string schoolId, DateTime testDate);
        IEnumerable<ParticipReport> GetResultsForParticip(int rsurParticipCode, DateTime testDate);
    }
}
