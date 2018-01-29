namespace Monit95App.Services.QuestionResult.ITakeEgeDtos
{
    /// <summary>
    /// Модель отправляемая на сервер для изменения
    /// </summary>
    /// <remarks>При необходимости данный объект отправляется в массиве</remarks>
    public class PutDto
    {
        public int QuestionResultId { get; set; }

        public int NewMark { get; set; }
    }
}
