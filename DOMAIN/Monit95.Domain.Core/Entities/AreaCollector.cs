using System.ComponentModel.DataAnnotations;

namespace Monit95App.Domain.Core.Entities
{
    public class AreaCollector
    {
        public int Id { get; set; }

        public int CollectorId { get; set; }

        [Required]
        public int AreaCode { get; set; }

        public bool IsFinished { get; set; }

        public virtual Collector Collector { get; set; }

        public virtual Area Area { get; set; }
    }
}
