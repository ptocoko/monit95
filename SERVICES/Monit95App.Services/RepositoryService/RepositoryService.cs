using System.IO;
using Monit95App.Services.Validation;
using Monit95App.Infrastructure.Data;
using System.Security.Cryptography;
using System.Linq;
using System;

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

        /// <summary>
        /// Добавление файла бланка ответов
        /// </summary>
        /// <param name="repositoryId"></param>
        /// <param name="fileStream"></param>
        /// <param name="fileName">Full file name.</param>
        /// <param name="areaCode"></param>
        /// <returns></returns>
        public ServiceResult Add(int repositoryId, Stream fileStream, string fileName, int areaCode)
        {
            var serviceResult = new ServiceResult();
            // Validate input parameters
            if (repositoryId <= 0)
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(repositoryId)} is invalid" });
                return serviceResult;
            }
            if (fileStream == null)
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(fileStream)} is invalid" });
                return serviceResult;
            }
            if (string.IsNullOrWhiteSpace(fileName))
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(fileName)} is invalid" });
                return serviceResult;
            }     
            if(!Enumerable.Range(201, 217).Contains(areaCode))
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(areaCode)} is invalid" });
                return serviceResult;
            }

            // Get all file hashes for current open subject's blocks
            var allHashes = context.RsurTestResults.Where(rtr => rtr.RsurParticipTest.RsurParticip.School.AreaCode == areaCode
                                                              && rtr.RsurParticipTest.RsurTest.IsOpen)
                                                              .Select(rtr => rtr.File.HexHash).ToList();
            if(!allHashes.Any())
            {
                serviceResult.Errors.Add(new ServiceError { HttpCode = 404, Description = "Not found" });
                return serviceResult;
            }

            // Generate hexadecimal hash for file's stream
            string hexHash;
            using (var md5 = MD5.Create())
            {
                var hashed = md5.ComputeHash(fileStream);
                hexHash = BitConverter.ToString(hashed).Replace("-", "");
            }

            // Check exist like this file in store by hash
            if (allHashes.Contains(hexHash))
            {
                serviceResult.Errors.Add(new ServiceError { HttpCode = 409, Description = "Like this file exist" });
                return serviceResult;
            }

            // Add to data base
            context.Files.Add(new Domain.Core.Entities.File
            {
                SourceName = fileName,
                RepositoryId = repositoryId,
                HexHash = hexHash
            });

            return serviceResult;
        }
    }
}
