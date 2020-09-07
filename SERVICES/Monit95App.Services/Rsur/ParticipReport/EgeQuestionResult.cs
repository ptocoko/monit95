using System.Collections.Generic;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class EgeQuestionResult
    {
        public int EgeQuestionNumber { get; set; }

        public string RsurQuestionNumbers { get; set; }

        public IEnumerable<int> QuestionNumbers { get; set; }

        public string ElementNames { get; set; }

        /// <summary>
        /// Процент выполнения
        /// </summary>
        public double Value { get; set; }
    }
}
