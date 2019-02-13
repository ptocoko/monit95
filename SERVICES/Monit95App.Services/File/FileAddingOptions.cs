using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.File
{
    public class FileAddingOptions
    {
        public bool UseHashAsFileName { get; set; } = true;
        public bool CheckIfFileExists { get; set; } = true;
    }
}
