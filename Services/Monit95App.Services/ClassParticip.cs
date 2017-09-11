using Monit95App.Domain.Core.Abstract;
using System;
using System.ComponentModel.DataAnnotations;

namespace Monit95App.Services
{
    public class ClassParticip : Person
    {
        [Required]
        public string ClassName { get; set; }

        [Required]
        public DateTime? Birthday { get; set; }

        [Required]
        public bool? WasDoo { get; set; }
    }
}
