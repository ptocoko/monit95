namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class RsurEgeQuestion
    {
        public int Id { get; set; }

        public int TestQuestionId { get; set; }

        public int EgeQuestionOrder { get; set; }

        public virtual TestQuestion TestQuestion { get; set; }
    }
}
