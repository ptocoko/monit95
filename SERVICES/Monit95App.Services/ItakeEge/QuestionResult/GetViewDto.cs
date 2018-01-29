namespace Monit95App.Services.QuestionResult.ITakeEgeDtos
{
    /// <summary>
    /// Модель отправляемая клиенту для редактирования
    /// </summary>
    /// <example>Отображение в общем списке</example>
    public class GetViewDto
    {
        public

        /// <summary>
        /// Информация об участнике
        /// </summary>
        /// <example>Шахабов Адам Хаважиевич</example>
        public string ParticipInfo { get; set; }

        /// <summary>
        /// Баллы по заданиям        :
        /// </summary>
        /// <example>1;1;0;1;1;0;0</example>
        public string QuestionResults { get; set; }
                                         
    }    
}
