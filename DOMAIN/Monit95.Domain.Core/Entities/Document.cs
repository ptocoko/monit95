namespace Monit95App.Domain.Core.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public partial class Document
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string ProjectName { get; set; }

        public DateTime PublishedDate { get; set; }

        public string Available { get; set; }

        public short TypeCode { get; set; }
    }
}
