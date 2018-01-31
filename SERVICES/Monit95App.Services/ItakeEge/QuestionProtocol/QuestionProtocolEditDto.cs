using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Monit95App.Services.QuestionResult.ITakeEgeDtos
{
    /// <summary>
    /// Протокол проверки заданий: модель для редактирования
    /// </summary>    
    public class QuestionProtocolEditDto
    {        
        /// <summary>
        /// Информация об участнике
        /// </summary>
        /// <example>Шахабов Адам Хаважиевич</example>
        public string ParticipInfo { get; set; }

        /// <summary>
        /// Список баллов по заданиям
        /// </summary>
        public ICollection<QuestionMarkEditModel> MarkCollection { get; set; } = new Collection<QuestionMarkEditModel>();                                                    
    }

    public class QuestionMarkEditModel
    {
        /// <summary>
        /// Номер задания
        /// </summary>
        public int Order { get; set; }

        /// <summary>
        /// Максимальный балл за задание
        /// </summary>
        public int MaxMark { get; set; }

        /// <summary>
        /// Балл по заданию
        /// </summary>
        /// <remarks>Может быть равен null при первом заполнения протокола проверки заданий</remarks>
        public double? AwardedMark { get; set; }

        /// <summary>
        /// Свойство для хранения адресата
        /// </summary>
        public int? QuestionMarkId { get; set; }
    }
}
