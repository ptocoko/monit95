using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Models
{
    public class ExcelRowAdress
    {
        public int ListNumber { get; private set; }
        public int RowNumber { get; private set; }

        public ExcelRowAdress(int listNumber, int rowNumber)
        {
            ListNumber = listNumber;
            RowNumber = rowNumber;
        }
    }
}
