using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Models
{
    public class ElementResultModel
    {      
        public string Code { get; set; }
        public string Name { get; set; }
        public int ElementTypeId { get; set; }
        public string ExerNumbers { get; set; }

        public ICollection<Dictionary<int, float>> ValuesOnTests { get; set; } //Key: TestNumber, Value: Value        
    }
}
