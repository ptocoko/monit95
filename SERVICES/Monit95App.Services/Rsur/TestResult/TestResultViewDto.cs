namespace Monit95App.Services.Rsur.TestResult
{
    /// <summary>
    /// Протокол проверки заданий КИМ
    /// </summary>
    public class TestResultViewDto
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

        /// <summary>
        /// Имя файла бланка ответов на стороне клиента
        /// <example>IMG-2017-12-09.TIF</example>
        /// </summary>
        public string FileSourceName { get; set; }
    }       
}