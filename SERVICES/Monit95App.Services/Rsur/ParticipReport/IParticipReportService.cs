using ServiceResult;
using System.Collections.Generic;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public interface IParticipReportService
    {
        ServiceResult<ParticipExtendReport> GetExtendReport(int rsurParticipTestId, int? areaCode = null, string schoolId = null);
        ServiceResult<ReportsListDto> GetReports(ReportsListOptions options, int? areaCode = null, string schoolId = null);
        //ServiceResult<IEnumerable<ParticipReport>> GetReportsForSchool(string schoolId, int offset, int length, string filter);

        ServiceResult<ReportsInfo> GetReportsInfo(int? areaCode = null, string schoolId = null);
    }
}
