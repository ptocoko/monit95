using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IMarks
    {
        IEnumerable<string> GetMarks(string[] strings);        
    }
}
