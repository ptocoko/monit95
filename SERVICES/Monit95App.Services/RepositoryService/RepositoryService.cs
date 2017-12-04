using System.IO;
using Monit95App.Services.Validation;
using Monit95App.Infrastructure.Data;

namespace Monit95App.Services.RepositoryService
{
    public class RepositoryService : IRepositoryService
    {
        #region Dependencies

        private readonly CokoContext context;

        #endregion

        #region All Constructors
        
        public RepositoryService(CokoContext context)
        {
            this.context = context;
        }

        #endregion

        public ServiceResult Add(int repositoryId, Stream fileStream, string fileName)
        {
            var serviceResult = new ServiceResult();
            if (repositoryId <= 0)
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(repositoryId)} is incorrect" });
                return serviceResult;
            }
            if (fileStream == null)
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(fileStream)} is null" });
                return serviceResult;
            }
            if (string.IsNullOrWhiteSpace(fileName))
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(fileName)} is null or empty" });
                return serviceResult;
            }                

            return serviceResult;            
        }
    }
}
