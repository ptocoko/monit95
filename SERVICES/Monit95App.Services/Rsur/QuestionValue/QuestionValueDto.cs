using System.Collections.Generic;

namespace Monit95App.Services.Rsur.TestResult
{
    /// <summary>
    /// Протокол проверки заданий КИМ
    /// </summary>
    public class QuestionValueEditDto
    {        
        public int ParticipCode { get; set; }
        
        public int ParticipTestId { get; set; }

        /// <summary>
        /// <example>"Орфография" | "0101-Орфография"</example>
        /// </summary>
        public string TestName { get; set; }
        
        public List<QuestionResult> QuestionResults { get; set; }

        /// <summary>
        /// Файл бланк ответов
        /// </summary>
        public int FileId { get; set; }
    }    

    public class QuestionResult
    {
        /// <summary>
        /// Номер по порядку
        /// </summary>
        public int Order { get; set; }

        /// <summary>
        /// Обозначение заданиям в КИМ
        /// <example>"1 | 2.1"</example>
        /// </summary>
        public string Name { get; set; } // 
        
        public int MaxMark { get; set; }
        
        public int? CurrentMark { get; set; }
    }
}