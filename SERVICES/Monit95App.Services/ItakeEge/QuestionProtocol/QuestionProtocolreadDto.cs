namespace Monit95App.Services.QuestionResult.ITakeEgeDtos
{
    /// <summary>
    /// Протокол проверки заданий участника для отображения в общей таблице
    /// </summary>
    /// <example>Отображение в общем списке</example>
    public class QuestionProtocolReadDto
    {
        public int ParticipTestId { get; set; }

        /// <summary>
        /// Информация об участнике
        /// </summary>
        /// <example>Шахабов Адам Хаважиевич</example>
        public string ParticipInfo { get; set; }

        /// <summary>
        /// Баллы по заданиям:
        /// </summary>
        /// <example>1;1;0;1;1;0;0</example>
        public string QuestionMarks { get; set; }
                                         
    }    
}
