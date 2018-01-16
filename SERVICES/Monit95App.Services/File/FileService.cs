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
        private const int MAX_FILE_SIZE = 15728664; // 15 mb

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
        /// <param name="sourceFileName">Имя файла также необходимо для получения расширения</param>
        /// <param name="userName">Для указанного пользователя устанавливаются уровни доступа READ и DELETE</param>
        /// <returns>fileId</returns>
        public int Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName)
        {
            return Add(repositoryId, sourceFileStream, sourceFileName, userName, new List<UserPermission>
            {
                new UserPermission
                {
                    UserName = userName,
                    Access = Access.Read
                },
                new UserPermission
                {
                    UserName = userName,
                    Access = Access.Delete
                }
            });
        }

        /// <summary>
        /// Добавление файла в репозиторий с указанием уровня доступа для различных пользователей
        /// </summary>
        /// <param name="repositoryId"></param>
        /// <param name="sourceFileStream"></param>
        /// <param name="sourceFileName">for file extension</param>
        /// <param name="userName"></param>
        /// <param name="permissions">список объектов с информацией о пользователях и разрешенных им действиях над файлом</param>
        /// <returns>fileId</returns>
        /// TODO: validate permissions
        public int Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName, IEnumerable<UserPermission> permissions)
        {
            // Validate repositoryId
            if (!context.Repositories.Any(repository => repository.Id == repositoryId))
                throw new ArgumentException($"{ nameof(repositoryId) } is invalid", nameof(repositoryId));
            // Validate sourceFileStream            
            if (sourceFileStream == null || sourceFileStream.Length > MAX_FILE_SIZE)
                throw new ArgumentException($"{nameof(sourceFileStream)} is invalid: null or > 15 Mb", nameof(sourceFileStream));
            // Validate userName
            if (!context.Monit95Users.Any(mu => mu.Login.Equals(userName)))
                throw new ArgumentException($"{ nameof(userName) } is invalid", nameof(userName));        
            // Generate hexHash
            string hexHash;
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(sourceFileStream);
                hexHash = BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
            // Check exist by hash
            if (context.Files.Any(file => file.RepositoryId == repositoryId && file.HexHash.Equals(hexHash)))
                throw new ArgumentException("Already exists");

            sourceFileName = Path.GetFileName(sourceFileName); // delete path
            var extension = Path.GetExtension(sourceFileName);

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
                FilePermissonList = permissions.Select(s => new FilePermission
                                    {
                                        UserName = s.UserName,
                                        PermissionId = (int)s.Access
                                    }).ToList()
            };
            
            context.Files.Add(fileEntity); // add file's entity to database            
            context.SaveChanges(); // send changes into database

            return fileEntity.Id;
        }
        /// <summary>
        /// Метод для удаление файла с указанием владельца
        /// </summary>
        /// <param name="fileId">Id файла в базе данных</param>
        /// <param name="userName">
        /// Данный параметр необходим: 1) Если необходимо проверить права на удаление, 2) Если имя файла содержит маску {userName}
        /// </param>        
        // TODO: refactoring
        public void Delete(int fileId, string userName)
        {
            var filePermission = new FilePermission
            {
                UserName = userName,
                PermissionId = 2
            };

            var fileEntity = GetFileEntity(fileId, filePermission);
            
            // Delete file system object
            var filePath = GetFilePathById(fileEntity.Id, userName);
            System.IO.File.Delete(filePath);
            
            // Delete database object
            context.Files.Remove(fileEntity);
            context.SaveChanges();
        }       

        /// <summary>
        /// Получает содержимое файла в кодировке Base64
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public string GetFileBase64String(int fileId, string userName)
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
        /// <remarks>При получении объекта идет проверка уровня доступа</remarks>
        /// <param name="fileId"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        // TODO: refactoring
        private Domain.Core.Entities.File GetFileEntity(int fileId, FilePermission filePermission)
        {
            // TODO: need refactoring
            var fileEntity = context.Files.SingleOrDefault(file => file.Id == fileId && file.FilePermissonList.Any(fp => fp.UserName == filePermission.UserName && fp.PermissionId == filePermission.PermissionId));                        

            if (fileEntity == null)
            {                
                throw new ArgumentException();
            }                            

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
        // TODO: refactoring
        private string GetFilePathById(int fileId, string userName)
        {
            var filePermission = new FilePermission
            {
                UserName = userName,
                PermissionId = 1
            };
            var fileEntity = GetFileEntity(fileId, filePermission);
            // Generate filePath
            var fileName = fileEntity.Name.Replace("{userName}", filePermission.UserName); // при наличии маски {userName} обработать ее
            var filePath = $@"{REPOSITORIES_FOLDER}\{fileEntity.RepositoryId}\{fileName}"; // generate filePath in repository  

            return filePath;
        }

        #endregion
    }
}
