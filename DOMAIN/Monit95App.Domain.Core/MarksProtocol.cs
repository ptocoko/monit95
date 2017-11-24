using Monit95App.Domain.Core.Validations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Domain.Core
{    
    ///<summary>
    /// Протокол проверки заданий КИМ
    ///</summary>
    public class MarksProtocol
    {
        [Required] // post
        [Range(10000, 99999)]
        public int ParticipCode { get; set; }

        [Required] // post
        public int ParticipTestId { get; set; }
        
        public string TestName { get; set; } // example: "Орфография" | "0101-Орфография"

        [MustHaveOneElement] // post
        public ICollection<QuestionResult> QuestionResults { get; set; }
    }    

    public class QuestionResult
    {
        [Required] // post
        public int Order { get; set; } // номер по порядку

        [Required] // post
        public string Name { get; set; } // обозначение заданиям в КИМ

        [Required] // post
        public int MaxMark { get; set; }

        [Required] // post
        public int CurrentMark { get; set; }
    }
}