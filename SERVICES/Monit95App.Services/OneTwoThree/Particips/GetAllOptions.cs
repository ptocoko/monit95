using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.OneTwoThree.Particips
{
    public class GetAllOptions
    {
        public int? Page { get; set; } = 1;
        public int? Length { get; set; } = 30;
        public string Search { get; set; }
        public string ClassId { get; set; }
    }
}
