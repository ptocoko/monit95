using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class Result
    {
        public int ParticipTestId { get; set; }
        public virtual ParticipTest ParticipTest { get; set; }

        public double? PrimaryMark { get; set; }

        public string Marks { get; set; }

        public int? Grade5 { get; set; }
    }
}
