using Monit95App.Domain.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Domain.Core.Abstract
{
    public abstract class Person
    {
        [Required]
        [StringLength(25, MinimumLength = 4)]
        public string Surname { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 3)]
        public string Name { get; set; }

        [StringLength(25)]
        public string SecondName { get; set; }
    }
}

