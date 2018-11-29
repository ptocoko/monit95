using System.Collections.Generic;

namespace Monit95App.Domain.Core.Entities
{
    public partial class RsurParticipTest
    {
        public int Id { get; set; }

        public int RsurTestId { get; set; }

        public int RsurParticipCode { get; set; }

        public bool Editable { get; set; }

        public virtual RsurParticip RsurParticip { get; set; }

        public virtual RsurTest RsurTest { get; set; }

        public virtual RsurTestResult RsurTestResult { get; set; }

        public virtual ICollection<RsurElementResult> RsurElementResults { get; set; } = new HashSet<RsurElementResult>();
    }
}
