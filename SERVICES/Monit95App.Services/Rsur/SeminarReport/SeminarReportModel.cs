using System.Collections.Generic;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public class SeminarReportModel
    {
        public int RsurReportId { get; set; }

        public string SchoolName { get; set; }

        public string DateText { get; set; }

        public string Text { get; set; }

        public IEnumerable<string> ImagesUrls { get; set; }
    }
}
