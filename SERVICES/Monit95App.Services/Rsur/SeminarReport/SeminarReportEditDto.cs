using System.Collections.Generic;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public class SeminarReportEditDto
    {
        public SeminarReportViewDto SeminarReportViewDto { get; set; }

        public IEnumerable<SeminarFile> SeminarFiles { get; set; }        
    }

    public class SeminarFile
    {
        public string Type { get; set; }
        public string Key { get; set; }
        public string FileSourceString { get; set; }
        public string FileUrl { get; set; }
    }
}
