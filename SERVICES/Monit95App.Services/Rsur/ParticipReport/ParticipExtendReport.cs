using System;
using System.Collections.Generic;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ParticipExtendReport : ParticipReport
    {
        public DateTime TestDate { get; set; }

        /// <summary>
        /// Test's name
        /// </summary>
        /// <example>"Алгебра" || "0201 - Алгебра"</example>
        public string TestName { get; set; } 

        public IEnumerable<EgeQuestionResult> EgeQuestionResults { get; set; }
    }
}
