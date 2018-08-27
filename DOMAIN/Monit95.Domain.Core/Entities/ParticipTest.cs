using System.Collections.Generic;

namespace Monit95App.Domain.Core.Entities
{
    /// <summary>
    /// Ёкзамен участника проекта
    /// </summary>
    /// <remarks>Ёкзамен на который распределен участник проекта</remarks>
    public partial class ParticipTest
    {
        public int Id { get; set; }

        /// <summary>
        /// ”частник проекта
        /// </summary>
        public virtual Particip Particip { get; set; }
        public int ParticipId { get; set; }

        /// <summary>
        /// Ёкзамен проекта
        /// </summary>
        public virtual ProjectTest ProjectTest { get; set; }
        public int ProjectTestId { get; set; }

        /// <summary>
        /// Ѕаллы по задани€м
        /// </summary>
        public virtual ICollection<QuestionMark> QuestionMarks { get; set; } = new HashSet<QuestionMark>();

        public virtual ICollection<OneTwoThreeQuestionMark> OneTwoThreeQuestionMarks { get; set; } = new HashSet<OneTwoThreeQuestionMark>();

        public virtual Result Result { get; set; }

        #region Computed indicators

        /// <summary>
        /// ѕервичный балл
        /// </summary>
        /// <example>ѕервичный балл - сумма баллов</example>
        /// <remarks>
        /// Ѕалл за задани€ может быть дестина€ цифра, к примеру, 1.5,
        /// поэтому устанавливаетс€ тип double
        /// </remarks>
        public double? PrimaryMark { get; set; }

        /// <summary>
        /// »тогова€ отметка
        /// </summary>        
        /// <remarks>-1 - отсутствовал</remarks>
        public int? Grade5 { get; set; }

        public string GradeString { get; set; }

        #endregion
    }
}
