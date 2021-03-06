using System.ComponentModel.DataAnnotations;

namespace Monit95App.Domain.Core.Abstract
{
    public abstract class Person
    {
        [Required]
        [StringLength(25, MinimumLength = 3)]
        public string Surname { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 2)]
        public string Name { get; set; }

        [StringLength(25)]
        public string SecondName { get; set; }
    }
}

