using Monit95App.Domain.Core.Abstract;
using System;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services
{
    public class ClassParticip : Person
    {
        [Required]
        [RegularExpression("^([0-9]|10|11)$|^(([0-9]|10|11) [АБВГДЕЖЗИКЛ])$")]
        public string ClassName { get; set; }

        [Required]
        public DateTime? Birthday { get; set; }

        [Required]
        public bool? WasDoo { get; set; }
    }
}
