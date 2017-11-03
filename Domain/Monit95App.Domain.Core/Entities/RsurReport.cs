using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class RsurReport
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public RsurReport()
        {
            RsurReportFiles = new HashSet<RsurReportFile>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(4)]
        public string SchoolId { get; set; }

        public DateTime Date { get; set; }

        [Required]
        [StringLength(500)]
        public string Text { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RsurReportFile> RsurReportFiles { get; set; }
    }
}
