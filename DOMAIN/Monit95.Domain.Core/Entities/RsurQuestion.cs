using System;
using System.Collections.Generic;

namespace Monit95App.Domain.Core.Entities
{
    /// <summary>
    /// Спецификация задания КИМ
    /// </summary>
    public class RsurQuestion
    {
        public int Id { get; set; }

        /// <summary>
        /// Работа в которой содержится данное задание
        /// </summary>
        public Test Test { get; set; }
        public Guid TestId { get; set; }

        /// <summary>
        /// Порядковый номер задания в работе Test
        /// </summary>
        public int Order { get; set; }

        /// <summary>
        /// Задание КИМ ЕГЭ к которому относиться данное задание
        /// </summary>
        public virtual EgeQuestion EgeQuestion { get; set; }
        public int EgeQuestionId { get; set; }

        public virtual EgeSkill EgeSkill { get; set; }
        public int? EgeSkillId { get; set; }

        /// <summary>
        /// Максимальный балл, который можно получить по заданию
        /// </summary>
        public int MaxMark { get; set; }

        public string Name { get; set; }

        public virtual ICollection<QuestionMark> QuestionMarks { get; set; } = new HashSet<QuestionMark>();
    }
}
