using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Validation;

namespace Monit95App.Services.Repository
{
    public class RepositoryService : IRepositoryService
    {
        #region Fields

        private const string REPOSITORIES_FOLDER = @"c:\repositories";

        #endregion

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
        /// <param name="sourceFileStream"></param>
        /// <param name="sourceFileName">Full file name or without path.</param>
        /// <param name="areaCode"></param>
        /// <returns>fileId</returns>
        public ServiceResult<int> Add(int repositoryId, Stream sourceFileStream, string sourceFileName, int areaCode)
        {
            var serviceResult = new ServiceResult<int>();
            // Validate input parameters
            if (repositoryId <= 0)
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(repositoryId)} is invalid" });
                return serviceResult;
            }
            if (sourceFileStream == null)
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(sourceFileStream)} is invalid" });
                return serviceResult;
            }
            if (string.IsNullOrWhiteSpace(sourceFileName))
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(sourceFileName)} is invalid" });
                return serviceResult;
            }     
            if(!Enumerable.Range(201, 217).Contains(areaCode))
            {
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(areaCode)} is invalid" });
                return serviceResult;
            }

            // 1) Get all hashes
            var allHashes = context.RsurTestResults.Where(rtr => rtr.RsurParticipTest.RsurParticip.School.AreaCode == areaCode
                                                              && rtr.RsurParticipTest.RsurTest.IsOpen)
                                                              .Select(rtr => rtr.File.HexHash).ToList();                    

            // 2) Generate hexadecimal hash for file's stream
            string hexHash;


            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(sourceFileStream);
                hexHash = BitConverter.ToString(hash).Replace("-", "");
            }

            // 3) Check exist such hash(file) in store
            if (allHashes.Contains(hexHash))
            {
                serviceResult.Errors.Add(new ServiceError { HttpCode = 409, Description = "Such file currently exist" });
                return serviceResult;
            }

            // 4) Save file to file system
            sourceFileName = Path.GetFileName(sourceFileName); // delete path
            var extension = Path.GetExtension(sourceFileName);
            if (string.IsNullOrEmpty(extension))
            {
                // has not extension
                serviceResult.Errors.Add(new ServiceError { Description = $"{nameof(sourceFileName)} has not extension" });
                return serviceResult;
            }
            var destFileName = $"{hexHash}{extension}";
            using (var destFileStream = File.Create($@"{REPOSITORIES_FOLDER}\{repositoryId}\{destFileName}"))
            {
                sourceFileStream.Seek(0, SeekOrigin.Begin);
                sourceFileStream.CopyTo(destFileStream);                
            }
            
            // 5) Add file to context and save to data base
            var fileEntity = new Domain.Core.Entities.File
            {
                SourceName = sourceFileName,
                RepositoryId = repositoryId,
                HexHash = hexHash,
                Name = destFileName
            };
            context.Files.Add(fileEntity);

            context.SaveChanges();

            serviceResult.Result = fileEntity.Id;
            return serviceResult;
        }
    }
}
