﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Domain.Core.Entities
{
    public class File
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public File()
        {
            RsurReportFiles = new HashSet<RsurReportFile>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public string HexHash { get; set; }

        public string SourceName { get; set; }

        public int RepositoryId { get; set; }

        public virtual Repository Repository { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RsurReportFile> RsurReportFiles { get; set; }

        public virtual ICollection<FilePermisson> FilePermissonList { get; set; } = new HashSet<FilePermisson>();
    }
}