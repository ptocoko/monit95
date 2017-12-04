namespace Monit95App.Services.Rsur.RsurTestResultService
{
    using System.Collections.Generic;

    /// <summary>
    /// Протокол проверки заданий КИМ
    /// </summary>
    public class RsurTestResultDto
    {        
        public int ParticipCode { get; set; }
        
        public int ParticipTestId { get; set; }
        
        public string TestName { get; set; } // example: "Орфография" | "0101-Орфография"
        
        public List<QuestionResult> QuestionResults { get; set; }

        public int FileId { get; set; } // бланк ответов
    }    

    public class QuestionResult
    {        
        public int Order { get; set; } // номер по порядку
        
        public string Name { get; set; } // обозначение заданиям в КИМ
        
        public int MaxMark { get; set; }
        
        public int CurrentMark { get; set; }
    }
}