using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Monit95App.Services.FileRespository
{
    public class FileRespositoryManager : IFileRepositoryManager
    {
        #region Fields

        private const string RootPath = @"c:\FileRepository";

        #endregion

        #region Services   

        public FileStream GetFileStream(string filePath, string userName)
        {
            var fullFilePath = Path.Combine(RootPath, filePath); // check exist file
            var fileStream = new FileStream(fullFilePath, FileMode.Open, FileAccess.Read);       

            return fileStream;
        }
  
        #endregion
    }
}
