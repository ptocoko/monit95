using System;

namespace Monit95App.Domain.Core.Entities
{
    public class RsurQuestion
    {
        public int Id { get; set; }

        public Guid TestId { get; set; }

        public int EgeQuestionId { get; set; }

        /// <summary>
        /// Номер задания в КИМ РСУР
        /// </summary>
        public int Order { get; set; }

        public virtual EgeQuestion EgeQuestion { get; set; }
    }
}
