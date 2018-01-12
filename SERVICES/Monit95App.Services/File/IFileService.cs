using System.Collections.Generic;
using System.IO;
using ServiceResult;

namespace Monit95App.Services.File
{
    public interface IFileService
    {
        int Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName);
        int Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName, IEnumerable<UserPermission> accesses);

        string GetFileBase64String(int fileId, string userName);

        ServiceResult<FileStream> GetFileStream(int fileId, string userName);

        void Delete(int fileId, string userName = null);
    }
}