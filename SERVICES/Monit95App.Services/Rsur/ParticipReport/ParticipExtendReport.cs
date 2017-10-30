using System;
using System.Collections.Generic;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ParticipExtendReport : ParticipReport
    {
        public DateTime TestDate { get; set; }

        public string TestName { get; set; } // e.g.: "Алгебра" || "0201 - Алгебра"

        public IEnumerable<EgeQuestionResult> EgeQuestionResults { get; set; }
    }
}
