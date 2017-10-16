using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.Interfaces
{
    public interface IFileRepositoryManager
    {
        FileStream GetFileStream(string filePath, string userName);
    }
}
