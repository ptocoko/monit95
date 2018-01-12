using Monit95App.Domain.Core.Entities;
using System.Collections.Generic;
using System.Globalization;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public class SeminarReport
    {
        public int RsurReportId { get; set; }

        public string SchoolName { get; set; }

        public string DateText { get; set; }

        public string Text { get; set; }

        public IDictionary<string, string> SeminarFiles { get; set; }

        public static SeminarReport CreateReportModel(RsurReport report)
        {
            return new SeminarReport
            {
                RsurReportId = report.Id,
                DateText = report.Date.ToString("dd MMM yyyy, HH:mm:ss", new CultureInfo("ru-RU")),
                SchoolName = $"{report.SchoolId} - {report.School.Name}",
            };
        }
    }
}
