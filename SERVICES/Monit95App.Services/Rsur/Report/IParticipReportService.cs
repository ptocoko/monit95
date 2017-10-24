using System.Collections.Generic;

namespace Monit95App.Services.Rsur.Report
{
    public interface IReportService
    {
        IEnumerable<ParticipReport> GetReports(int rsurTestId, int areaCode);
        ParticipExtendReport GetReport(int rsurParticipTestId);
    }
}
