namespace Monit95App.Services.QuestionResult.ITakeEgeDtos
{
    /// <summary>
    /// Модель отправляемая на сервер для изменения
    /// </summary>    
    public class PutDto
    {
        public int QuestionResultId { get; set; }

        public int NewMark { get; set; }
    }
}
