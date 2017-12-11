namespace Monit95App.Domain.Core.Entities
{
    public partial class RsurEgeQuestion
    {
        public int Id { get; set; }

        public int TestQuestionId { get; set; }

        public int EgeQuestionOrder { get; set; }

        public virtual TestQuestion TestQuestion { get; set; }
    }
}
