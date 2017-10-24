using System.Collections.Generic;

namespace Monit95App.Services.Rsur.Report
{
    public class ParticipExtendReport : ParticipReport
    {
        public string TestDate { get; set; }
        
        public string TestNumberCodeWithName { get; set; } // e.g.: 0201 - Алгебра

        IEnumerable<EgeQuestionResult> EgeQuestionResults { get; set; }
    }

    public class EgeQuestionResult
    {
        public int EgeQuestionNumber { get; set; }

        public string RsurQuestionNumbers { get; set; } // e.g. 1.1; 1.2; 1.3

        public string ElementNames { get; set; }

        public int Value { get; set; } // %
    }
}
