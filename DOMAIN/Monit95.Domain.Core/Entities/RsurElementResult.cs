using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class RsurElementResult
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RsurParticipTestId { get; set; }

        [Key, Column(Order = 1)]
        public int ElementOrder { get; set; }

        public double Value { get; set; }
        
        public virtual RsurParticipTest RsurParticipTest { get; set; }
    }
}
