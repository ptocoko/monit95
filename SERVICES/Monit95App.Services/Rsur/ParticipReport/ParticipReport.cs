using Monit95App.Domain.Core;

namespace Monit95App.Services.Rsur.ParticipReport
{
    public class ParticipReport
    {
        public int Code { get; set; }    

        public string TestNameWithDate { get; set; } // e.g.: "Орфография, 11.10.2017"

        public string IsPassTest { get; set; } // "зачет" || "незачет"

        public SchoolParticip SchoolParticipInfo { get; set; }
    }
}
