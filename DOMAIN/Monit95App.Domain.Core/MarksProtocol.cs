using System.Collections.Generic;

namespace Monit95App.Domain.Core
{    
    ///<summary>
    /// Протокол проверки заданий КИМ
    ///</summary>
    public class MarksProtocol
    {
        public int ParticipCode { get; set; }

        public int ParticipTestId { get; set; }

        public string TestName { get; set; } // example: "Орфография" | "0101-Орфография"

        public ICollection<QuestionResult> QuestionResults { get; set; }

    }    

    public class QuestionResult
    {
        public int Order { get; set; } // номер по порядку

        public string Name { get; set; } // обозначение заданиям в КИМ

        public int MaxMark { get; set; }

        public int CurrentMark { get; set; }
    }
}