using System.IO;
using ServiceResult;

namespace Monit95App.Services.File
{
    public interface IFileService
    {
        ServiceResult<int> Add(int repositoryId, Stream sourceFileStream, string userName);

        ServiceResult<int> Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName);

        void Delete(int fileId, string userName = null);

        string GetFileBase64String(int fileId, string userName = null);

        ServiceResult<FileStream> GetFileStream(int fileId, string userName);
    }
}