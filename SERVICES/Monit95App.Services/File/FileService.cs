using System;
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
    public class FileService : IFileService
    {
        #region Fields

        private const string REPOSITORIES_FOLDER = @"c:\repositories";

        #endregion

        #region Dependencies

        private readonly CokoContext context;        

        #endregion

        #region All Constructors

        public FileService(CokoContext context)
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
            if (sourceFileStream == null  || sourceFileStream.Length > 15728640) // > 15 Mb
            {
                result.Errors.Add(new ServiceError { Description = $"{nameof(sourceFileStream)} is invalid: null or length > 15 Mb" });
                return result;
            }

            // Generate hexHash
            string hexHash;
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(sourceFileStream);
                hexHash = BitConverter.ToString(hash).Replace("-", "").ToLower();                
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
            if (context.Files.Any(file => file.RepositoryId == repositoryId && file.HexHash.Equals(hexHash)))
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
                SourceName = sourceFileName.ToLower(),
                RepositoryId = repositoryId,
                HexHash = hexHash,
                Name = destFileName.ToLower(),
                FilePermissonList = new HashSet<FilePermisson>
                {
                    new FilePermission
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

        /// <summary>
        /// Скачивает файл из репозитория и возвращает полный путь к нему
        /// </summary>
        /// <remarks>
        /// Копирует файл из репозитория в указанный путь <see cref="destHostFolder"/> и возвращает полный путь.
        /// Если файл уже существует по пути <see cref="destHostFolder"/>, то копирование не происходит, а просто возвращается уже существующий полный путь
        /// </remarks>
        /// <param name="fileId"></param>
        /// <param name="destHostFolder"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public ServiceResult<string> GetFileName(int fileId, string destHostFolder, string userName)
        {
            var result = new ServiceResult<string>();
            
            // Get file entity from database
            var fileEntity = context.Files.SingleOrDefault(file => file.FilePermissonList.Any(fp => fp.UserName == userName) && file.Id == fileId);
            if (fileEntity == null)
            {
                result.Errors.Add(new ServiceError { HttpCode = 404, Description = $"Файл {fileId} не найдед или отсутствует доступ у пользователя {userName}"});
                return result;
            }

            // Generate fullSourceFileName
            var fullSourceFileName = GetFullSourceFileName(fileEntity, userName);

            // Generate destFileName
            var destFileName = Path.Combine(destHostFolder, fileEntity.Name); // generate dest file name

            // Validate: check exist destFile
            if (System.IO.File.Exists(destFileName))
            {
                result.Result = destFileName;
                return result;
            }            

            // Validate destHostFolder
            if (!Directory.Exists(destHostFolder))
            {
                result.Errors.Add(new ServiceError { Description = $"Parameter {nameof(destHostFolder)} is invalid: directory is not exist" });
                return result;
            }            
            
            System.IO.File.Copy(fullSourceFileName, destFileName); // copy file to dest folder

            // Return destFileName
            result.Result = destFileName;
            return result;
        }

        /// <summary>
        /// Перемещает указанный список файлов в указанную папку, убирая из списка файлов дубликаты
        /// </summary>
        /// <param name="fileNames">список файлов</param>
        /// <param name="distFolder">папка, в которую нужно переместить файлы без дубликатов</param>
        /// <returns>список имен перемещенных файлов</returns>
        public static IEnumerable<string> GetNonDuplicateFiles(string[] fileNames, string distFolder)
        {
            if (!Directory.Exists(distFolder)) throw new ArgumentException("Указанная удаленная папка не существует");

            List<string> hashes = new List<string>();
            List<string> movedFileNames = new List<string>();

            string hashString;
            foreach (var fileName in fileNames)
            {
                if (!Path.IsPathRooted(fileName)) throw new ArgumentException("Имена файлов должны содержать полный путь к ним");
                if (!System.IO.File.Exists(fileName)) throw new ArgumentException($"Файла {fileName} не существует");

                using (var md5 = MD5.Create())
                {
                    using (var stream = System.IO.File.OpenRead(fileName))
                    {
                        var hash = md5.ComputeHash(stream);
                        hashString = BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
                    }
                }

                if (!hashes.Contains(hashString))
                {
                    hashes.Add(hashString);
                    var fileNameWithoutPath = Path.GetFileName(fileName);
                    System.IO.File.Move(fileName, $"{distFolder}\\{fileNameWithoutPath}");

                    movedFileNames.Add($"{distFolder}\\{fileNameWithoutPath}");
                }
            }

            return movedFileNames;
        }

        public ServiceResult<FileStream> GetFileContent(int fileId, string userName)
        {
            var result = new ServiceResult<FileStream>();

            // Get file entity from database
            var fileEntity = context.Files.SingleOrDefault(file => file.FilePermissonList.Any(fp => fp.UserName == userName) && file.Id == fileId); // для получения контента файла достаточен любой уровень доступа (FilePermissonList)
            if (fileEntity == null)
            {
                result.Errors.Add(new ServiceError { HttpCode = 404, Description = $"Файл {fileId} не найден или отсутствует доступ у пользователя {userName}" });
                return result;
            }

            // Get full file name
            var fullSourceFileName = GetFullSourceFileName(fileEntity, userName);

            // Get file's stream
            result.Result = System.IO.File.OpenRead(fullSourceFileName);
            
            return result;
        }

        private string GetFullSourceFileName(Domain.Core.Entities.File file, string userName)
        {
            // Generate fullFileName
            var fileName = file.Name.Replace("{userName}", userName); // при наличии маске {userName} обработать ее
            
            var fullSourceFileName = $@"{REPOSITORIES_FOLDER}\{file.RepositoryId}\{fileName}"; // generate source file name  

            return fullSourceFileName;
        }
    }
}
