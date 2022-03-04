using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Document
{
    public interface IPrivateFileService
    {
        IEnumerable<string> GetFileNames(string schoolId);
    }
}
