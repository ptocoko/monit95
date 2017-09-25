using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTOs
{
    public class PutMarksDto
    {        
        [Required]
        //[RegularExpression(@"((\d;)|(\d,))+(\d)$")] add also X;X;X;X;X
        public string Marks { get; set; }        
    }
}
