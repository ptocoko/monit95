using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Domain.Core.Entities
{
    public class Question
    {
        public int Id { get; set; }

        [StringLength(1000)]
        public string Text { get; set; }

        [Required]
        [StringLength(4)]
        public string CreatorSchoolId { get; set; }

        public DateTime AddedDate { get; set; }

        [StringLength(500)]
        public string ElementNames { get; set; }

        [StringLength(500)]
        public string SkillNames { get; set; }

        public string SchoolId { get; set; }
        public virtual School School { get; set; }
    }
}
