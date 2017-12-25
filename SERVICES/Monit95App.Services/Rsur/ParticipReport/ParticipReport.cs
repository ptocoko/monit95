using Monit95App.Domain.Core;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ParticipReport
    {
        public int Code { get; set; }

        /// <summary>
        /// Test's name with specify test's date
        /// </summary>
        /// <example>"Орфография, 11.10.2017"</example>
        public string TestNameWithDate { get; set; } // e.g.: 

        /// <summary>
        /// Get or set pass or fail test
        /// </summary>
        /// <example>"зачет" || "незачет" || "отсутствовал"</example>
        public string IsPassTest { get; set; }

        public SchoolParticip SchoolParticipInfo { get; set; }

        public int RsurParticipTestId { get; set; }
    }
}
