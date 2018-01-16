using Monit95App.Domain.Core.Entities;
using ServiceResult;
using System.Collections.Generic;
using System.IO;
using System.Web;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public interface ISeminarReportService
    {
        VoidResult DeleteReport(int rsurReportId, string schoolId);

        SeminarReportEditDto GetEditDto(int reportId, string userName);

        ServiceResult<int> CreateReport(Dictionary<string, UniqueStream> uniqueStreamDictionary, string schoolId);        

        IEnumerable<SeminarReportViewDto> GetViewDtos(string userName);        
    }
}
