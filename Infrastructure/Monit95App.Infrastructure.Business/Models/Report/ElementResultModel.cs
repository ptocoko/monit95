using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Infrastructure.Business.Models.Report
{
    public class ElementResultModel
    {
        public ElementResultModel()
        {
            this.ValuesOnTests = new List<Dictionary<int, float>>();
        }

        public string Code { get; set; }
        public string Name { get; set; }
        public int ElementTypeId { get; set; }
        public string ExerNumbers { get; set; }

        public ICollection<Dictionary<int, float>> ValuesOnTests { get; set; } //Key: TestNumber, Value: Value        
    }
}
