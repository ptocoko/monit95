using Monit95App.Services.Interfaces;
using System.Collections.Generic;

namespace Monit95App.Services.SchoolFiles
{
    public interface IReportMetaHandler
    {
        IEnumerable<ReportModel> GetReportMetasBySchool(string schoolId, ISchoolReportFileNameSource iFileNames);
        void SetReportIsGot(int reportId, string schoolId);
    }
}
