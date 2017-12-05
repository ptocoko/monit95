using Monit95App.Services.Validation;
using System.IO;

namespace Monit95App.Services.RepositoryService
{
    public interface IRepositoryService
    {
        ServiceResult Add(int repositoryId, Stream fileStream, string fileName, int areaCode);
    }
}