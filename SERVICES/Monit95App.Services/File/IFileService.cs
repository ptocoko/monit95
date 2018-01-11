using System.IO;
using Monit95App.Domain.Core.Entities;
using Monit95App.Services.Enums;
using ServiceResult;

namespace Monit95App.Services.File
{
    public interface IFileService
    {
        int Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName);                

        string GetFileBase64String(int fileId, string userName);

        ServiceResult<FileStream> GetFileStream(int fileId, string userName);

        void Delete(int fileId, string userName = null);
    }
}