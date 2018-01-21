using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Domain.Core.Entities
{
    public class Repository
    {    
        public int Id { get; set; }

        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(200)]
        public string Path { get; set; }
        
        // TODO: что дает такое определение?
        public virtual ICollection<File> Files { get; set; } = new HashSet<File>();
    }
}
