using ServiceResult;
using System.Collections.Generic;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public interface IParticipReportService
    {
        ServiceResult<ParticipExtendReport> GetExtendReport(int rsurParticipTestId, int? areaCode = null, string schoolId = null);
        ServiceResult<IEnumerable<ParticipReport>> GetReportsForArea(int areaCode);
        ServiceResult<IEnumerable<ParticipReport>> GetReportsForSchool(string schoolId);        
    }
}
