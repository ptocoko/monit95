using Monit95App.Domain.Core.Entities;
using ServiceResult;
using System.Collections.Generic;
using System.IO;
using System.Web;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public interface ISeminarReportService
    {                
        Dictionary<string, string> GetReport(int reportId, string userName);

        ServiceResult<int> CreateReport(Dictionary<string, UniqueStream> uniqueStreamDictionary, string schoolId);

        VoidResult DeleteReport(int rsurReportId, string schoolId);

        ServiceResult<IEnumerable<SeminarReportModel>> GetReportsList(string schoolId);
        ServiceResult<IEnumerable<SeminarReportModel>> GetReportsList(int areaCode);
    }
}
