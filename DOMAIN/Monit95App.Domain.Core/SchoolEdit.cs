namespace Monit95App.Domain.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SchoolEdit
    {
        [StringLength(4)]
        public string Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        public virtual School School { get; set; }
    }
}
