using Monit95App.Domain.Core;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ParticipReport
    {
        /// <example>
        /// 12345
        /// </example>
        public int Code { get; set; }

        /// <summary>
        /// Test's name with specify test's date
        /// </summary>
        /// <example>"0101 - Орфография"</example>
        public string TestName { get; set; }

        /// <summary>
        /// Get or set pass or fail test
        /// </summary>
        /// <example>"ЗАЧЕТ" || "НЕЗАЧЕТ" || "ОТСУТСТВОВАЛ"</example>
        public string TestStatus { get; set; }

        /// <summary>
        /// Наименование этапа диагностики
        /// </summary>
        /// <example>"Октябрь-2017"</example>
        public string ExamName { get; set; } 
        
        public int? Grade5 { get; set; }

        public SchoolParticip SchoolParticipInfo { get; set; }

        public int RsurParticipTestId { get; set; }
    }
}
