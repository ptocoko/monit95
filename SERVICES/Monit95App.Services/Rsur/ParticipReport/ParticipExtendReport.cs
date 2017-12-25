using System;
using System.Collections.Generic;

namespace Monit95App.Services.Rsur.ParticipReport
{
    /// <summary>
    /// Карта компетенции учителя
    /// </summary>
    public class ParticipExtendReport : ParticipReport
    {
        public DateTime TestDate { get; set; }      

        public IEnumerable<EgeQuestionResult> EgeQuestionResults { get; set; }
    }
}
