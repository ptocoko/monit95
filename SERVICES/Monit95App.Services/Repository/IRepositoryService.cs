using System.IO;
using Monit95App.Services.Validation;

namespace Monit95App.Services.Repository
{
    public interface IRepositoryService
    {
        ServiceResult<int> Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName);
        VoidResult Delete(int fileId, string userName);
    }
}