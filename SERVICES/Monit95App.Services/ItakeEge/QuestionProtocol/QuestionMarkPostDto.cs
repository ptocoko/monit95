namespace Monit95App.Services.ItakeEge.QuestionProtocol
{
    public class QuestionMarkPostDto
    {
        public int Order { get; set; }

        /// <summary>
        /// Полученный балл по заданию
        /// </summary>
        public int AwardedMark { get; set; }
    }
}
