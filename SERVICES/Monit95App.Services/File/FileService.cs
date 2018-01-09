using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Enums;
using ServiceResult;

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

        #region API methods

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
                result.Errors.Add(new ServiceError { Description = $"{nameof(sourceFileStream)} is invalid: null" });
                return result;
            }
            if (sourceFileStream.Length > 15728640) // > 15 Mb
            {
                result.Errors.Add(new ServiceError { HttpCode = 413, Description = $"{nameof(sourceFileStream)} is invalid: length > 15 Mb" });
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
                FilePermissonList = new HashSet<FilePermission>
                {
                    new FilePermission
                    {
                        UserName = userName,
                        PermissionId = (int)Enums.Permission.Read
                    },
                    new FilePermission
                    {
                        UserName = userName,
                        PermissionId = (int)Enums.Permission.Delete
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
        /// Метод для удаление файла с указанием владельца
        /// </summary>
        /// <param name="fileId">Id файла в базе данных</param>
        /// <param name="userName">
        /// Данный параметр необходим: 1) Если необходимо проверить права на удаление, 2) Если имя файла содержит маску {userName}
        /// </param>
        public void Delete(int fileId, string userName = null)
        {            
            var fileEntity = GetFileDbEntity(fileId, userName);

            // Delete database object
            context.Files.Remove(fileEntity);
            context.SaveChanges();

            // Delete file system object
            var filePath = GetFilePathById(fileEntity.Id, userName);
            System.IO.File.Delete(filePath);
        }       

        /// <summary>
        /// Получает содержимое файла в кодировке Base64
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public string GetFileBase64String(int fileId, string userName = null)
        {            
            var filePath = GetFilePathById(fileId, userName);

            byte[] bytes = System.IO.File.ReadAllBytes(filePath);
            var base64String = Convert.ToBase64String(bytes);
            
            return base64String;
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

        /// <summary>
        /// Get file stream
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public ServiceResult<FileStream> GetFileStream(int fileId, string userName)
        {
            var result = new ServiceResult<FileStream>();            
            // Get file path
            var filePath = GetFilePathById(fileId, userName);
            // Get file stream
            result.Result = System.IO.File.OpenRead(filePath);

            return result;
        }

        public ServiceResult<int> Add(int repositoryId, Stream sourceFileStream, string userName)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region Private methods

        /// <summary>
        /// Получает объект File из базы даных
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        private Domain.Core.Entities.File GetFileDbEntity(int fileId, string userName = null)
        {
            var query = context.Files.Where(file => file.Id == fileId); // create query
            if (!string.IsNullOrWhiteSpace(userName))
                query = query.Where(file => file.FilePermissonList.Any(fp => fp.UserName == userName && fp.PermissionId == (int)Enums.Permission.Read)); // edit query
            var fileEntity = query.SingleOrDefault(); // performance query
            // Fail
            if (fileEntity == null)
                throw new ArgumentException("Is invalid", $"{nameof(fileId)}: '{fileId}' or {nameof(userName)}: '{userName}'");
            if (fileEntity.Name.Contains("{userName}") && string.IsNullOrWhiteSpace(userName))
                throw new ArgumentException("Is null or empty, but file name has pattern {userName}", $"{nameof(userName)}");

            return fileEntity;
        }   

        /// <summary>
        /// Получает полный путь к файлу на файловой системе
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="userName">
        /// Данный параметр необходим если в названии файла будет маска к примеру "{userName_ру_распределение.xlsx}".
        /// Параметр может быть равен null
        /// </param>
        /// <returns></returns>
        private string GetFilePathById(int fileId, string userName)
        {
            var fileEntity = GetFileDbEntity(fileId, userName);
            // Generate filePath
            var fileName = fileEntity.Name.Replace("{userName}", userName); // при наличии маски {userName} обработать ее
            var filePath = $@"{REPOSITORIES_FOLDER}\{fileEntity.RepositoryId}\{fileName}"; // generate filePath in repository  

            return filePath;
        }

        #endregion
    }
}
