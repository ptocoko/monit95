using Monit95App.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95.WebAPI.Models
{
    //Данные о школьном отчете
    public class RMschool : ReportMeta
    {
        public string WWWref { get; set; } //e.g. 
    }
}
