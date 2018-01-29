using System.Collections.Generic;

namespace Monit95App.Services.QuestionResult.ITakeEgeDtos
{
    /// <summary>
    /// Модель отправляемая клиенту для редактирования
    /// </summary>
    /// <remarks>Для протокола проверки заданий участника</remarks>
    public class GetEditDto
    {
        /// <summary>
        /// Информация об участнике
        /// </summary>
        /// <example>Шахабов Адам Хаважиевич</example>
        public string ParticipInfo { get; set; }

        public ICollection<QuestionResultEditDto> QuestionResults { get; set; } = new List<QuestionResultEditDto>();

        public class QuestionResultEditDto
        {
            public int Order { get; set; }
  
            /// <summary>
            /// Свойство для хранения адресата
            /// </summary>
            public int QuestionResultId { get; set; }
            
            /// <summary>
            /// Балл по заданию
            /// </summary>
            /// <remarks>Может быть равен null при первом заполнения протокола проверки заданий</remarks>
            public int? Mark { get; set; }
        }                                           
    }    
}
