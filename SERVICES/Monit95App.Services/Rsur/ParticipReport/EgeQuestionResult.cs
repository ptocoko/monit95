namespace Monit95App.Services.Rsur.ParticipReport
{
    public class EgeQuestionResult
    {
        public int EgeQuestionNumber { get; set; }

        public string RsurQuestionNumbers { get; set; } // e.g. 1.1; 1.2; 1.3

        public string ElementNames { get; set; }

        public double Value { get; set; } // %
    }
}
