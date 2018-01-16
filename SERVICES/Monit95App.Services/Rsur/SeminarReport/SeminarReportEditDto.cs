using System.Collections.Generic;

namespace Monit95App.Services.Rsur.SeminarReport
{
    public class SeminarReportEditDto
    {
        public SeminarReportViewDto SeminarReportViewDto { get; set; }

        public IDictionary<string, string> SeminarFiles { get; set; }        
    }
}
