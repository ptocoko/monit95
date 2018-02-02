namespace Monit95App.Domain.Core.Entities
{
    /// <summary>
    /// Результат по заданию — балл по заданию
    /// </summary>
    public class QuestionMark
    {
        public int Id { get; set; }

        /// <summary>
        /// Экзамен участника
        /// </summary>
        public ParticipTest ParticipTest { get; set; }
        public int ParticipTestId { get; set; }

        /// <summary>
        /// Задание в КИМ
        /// </summary>
        public RsurQuestion Question { get; set; }
        public int QuestionId { get; set; }
       
        /// <summary>
        /// Полученный балл по заданию
        /// </summary>
        public double AwardedMark { get; set; }
    }
}
