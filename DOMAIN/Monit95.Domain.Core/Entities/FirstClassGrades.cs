using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class FirstClassGrades
    {
        [Key, ForeignKey("Particip")]
        public int ParticipId { get; set; }
        public short? FirstClassGrade5 { get; set; }
        public string FirstClassGradeStr { get; set; }

        public virtual Particip Particip { get; set; }
    }
}
