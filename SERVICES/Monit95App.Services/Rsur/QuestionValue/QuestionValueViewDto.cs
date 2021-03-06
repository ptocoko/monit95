namespace Monit95App.Services.Rsur.TestResult
{
    /// <summary>
    /// Протокол проверки заданий КИМ
    /// </summary>
    public class QuestionValueViewDto
    {        
        public int ParticipCode { get; set; }

        /// <summary>
        /// <example>"Орфография" or "0101-Орфография"</example>
        /// </summary>
        public string TestName { get; set; }                

        /// <summary>
        /// <example>"1;1;0;0;1"</example>
        /// </summary>
        public string RsurQuestionValues { get; set; }

        public int ParticipTestId { get; set; }
    }       
}