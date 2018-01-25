using System;

namespace Monit95App.Domain.Core.Entities
{
    public class Question
    {
        public int Id { get; set; }
                
        /// <summary>
        /// Порядковый номер задания в КИМ
        /// </summary>
        public int Order { get; set; }

        public Test Test { get; set; }
        public Guid TestId { get; set; }

        public virtual EgeQuestion EgeQuestion { get; set; }
        public int EgeQuestionId { get; set; }
    }
}
