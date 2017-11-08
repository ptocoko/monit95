using System.Collections.Generic;
using System.IO;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public interface ISeminarReportService
    {
        int SaveText(string text, string schoolId); // return reportId

        int SaveFile(Stream fileStream, string fileExtension, int reportId, int index, string imagesServerFolder);

        IEnumerable<SeminarReportModel> GetSeminarReports(string schoolId);

        IEnumerable<SeminarReportModel> GetSeminarReports(int areaCode);

        SeminarReportModel GetReport(int reportId);
    }
}
