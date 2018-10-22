using System.Collections.Generic;

namespace Monit95App.Services.Rsur.ParticipReport
{
    /// <summary>
    /// Карта компетенции учителя
    /// </summary>
    public class ParticipExtendReport : ParticipReport
    {
        /// <summary>
        /// ФИО участника
        /// </summary>
        public string FullParticipName { get; set; }                

        public string TestDateString { get; set; }

        public string TestNumberCode { get; set; }
        public int RsurTestId { get; set; }

        public int[] Marks { get; set; }

        public List<EgeQuestionResult> EgeQuestionResults { get; set; }
    }
}
