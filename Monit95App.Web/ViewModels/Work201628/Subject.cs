using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Monit95App.ViewModels.Work201628
{
    public class Subject
    {
        public int NumCode { get; set; }
        public string StrCode { get; set; } //РУ, МА, ФИ, ...
        public string Name { get; set; }
        
        public bool Checked { get; set; }
    }
}