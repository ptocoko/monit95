﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Enums;
using Monit95App.Services.Validation;

namespace Monit95App.Services.File
{
    public class RepositoryService : IFileService
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
        /// Добавление файла в репозиторий
        /// </summary>
        /// <param name="repositoryId"></param>
        /// <param name="sourceFileStream"></param>
        /// <param name="sourceFileName">Full file name or without path.</param>
        /// <param name="userName"></param>
        /// <returns>fileId</returns>
        public ServiceResult<int> Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName)
        {
            var result = new ServiceResult<int>();

            // Validate sourceFileStream
            if (sourceFileStream == null)
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(sourceFileStream)} is invalid" });
                return result;

            }            
            if (sourceFileStream.Length > 15728640)
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(sourceFileStream)} is invalid: length > 15 Mb" });
                return result;
            }

            // Generate hexHash
            string hexHash;
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(sourceFileStream);
                hexHash = BitConverter.ToString(hash).Replace("-", "");                
            }

            // Validate userName
            if (!context.Monit95Users.Any(mu => mu.Login.Equals(userName))) 
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(userName)} is invalid" });
                return result;
            }

            // Validate repositoryId
            if (!context.Repositories.Any(repository => repository.Id == repositoryId)) //validate repositoryId
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(repositoryId)} is invalid" });
                return result;
            }

            // Check exist
            if (context.Files.Any(file => file.RepositoryId == repositoryId && file.HexHash == hexHash))
            {
                result.Errors.Add(new ServiceError { HttpCode = 409, Description = "Such file currently exist" });
                return result;
            }                      

            // Save file to file system
            sourceFileName = Path.GetFileName(sourceFileName); // delete path
            var extension = Path.GetExtension(sourceFileName);
            if (string.IsNullOrEmpty(extension))
            {                
                result.Errors.Add(new ServiceError { Description = $"{nameof(sourceFileName)} is invalid" });
                return result;
            }
            var destFileName = $"{hexHash}{extension}";
            using (var destFileStream = System.IO.File.Create($@"{REPOSITORIES_FOLDER}\{repositoryId}\{destFileName}"))
            {
                sourceFileStream.Seek(0, SeekOrigin.Begin);
                sourceFileStream.CopyTo(destFileStream);
                sourceFileStream.Close();
            }

            // Create file's entity
            var fileEntity = new Domain.Core.Entities.File
            {
                SourceName = sourceFileName,
                RepositoryId = repositoryId,
                HexHash = hexHash,
                Name = destFileName,
                FilePermissonList = new HashSet<FilePermisson>
                {
                    new FilePermisson
                    {
                        UserName = userName,
                        PermissionId = (int)FilePermissionId.ReadAndDelete
                    }
                }
            };            

            // Add file's entity to database
            context.Files.Add(fileEntity);             

            // Send changes into database
            context.SaveChanges();
            
            result.Result = fileEntity.Id;
            return result;
        }

        /// <summary>
        /// Удаляет файл из репозитория
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public VoidResult Delete(int fileId, string userName)
        {
            var result = new VoidResult();

            // Try get entity
            var fileEntity = context.Files.SingleOrDefault(file => file.Id == fileId && file.FilePermissonList
                                          .Any(fp => fp.UserName == userName && fp.PermissionId == (int)FilePermissionId.ReadAndDelete));
            // Fail
            if (fileEntity == null)
            {
                result.Errors.Add(new ServiceError { HttpCode = 404 });
                return result;
            }

            // Success: remove and send a request to make change in database
            context.Files.Remove(fileEntity);
            context.SaveChanges();

            return result;
        }
    }
}