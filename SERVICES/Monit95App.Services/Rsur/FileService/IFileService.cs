using System.IO;

namespace Monit95App.Services.Rsur.FileService
{
    public interface IFileService
    {
        int Add(int repositoryId, Stream stream, string fileName);
    }
}
