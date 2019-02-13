using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Enums;
using Monit95App.Domain.Core.Entities;
using Entities = Monit95App.Domain.Core.Entities;
using System.Drawing.Imaging;
using Monit95App.Services.Exceptions;

namespace Monit95App.Services.File
{
    public class FileService : IFileService
    {
        #region Fields
        
        private const int MAX_FILE_SIZE = 15728664; // 15 mb

        #endregion

        #region Dependencies

        private readonly CokoContext context;        

        #endregion

        #region Constructors

        public FileService()
        {

        }

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
        public int Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName, FileAddingOptions options)
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
            }, options);
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
        public int Add(int repositoryId, Stream sourceFileStream, string sourceFileName, string userName, IEnumerable<UserPermission> permissions, FileAddingOptions options)
        {
            var repositoryEntity = context.Repositories.Find(repositoryId);            
            if (repositoryEntity == null)
                throw new ArgumentException($"{ nameof(repositoryId) } is invalid", nameof(repositoryId));            
            if (sourceFileStream == null || sourceFileStream.Length > MAX_FILE_SIZE) // validate sourceFileStream            
                throw new ArgumentException($"{nameof(sourceFileStream)} is invalid: null or > 15 Mb", nameof(sourceFileStream));            
            if (!context.Monit95Users.Any(mu => mu.Login.Equals(userName))) // validate userName
                throw new ArgumentException($"{ nameof(userName) } is invalid", nameof(userName));

            // Generate hexHash
            string hexHash = GetHash(sourceFileStream);

            if (options.CheckIfFileExists)
            {
                if (CheckIfFileExists(hexHash, repositoryId)) // check exist dublicate in repository by hexHash
                    throw new ArgumentException("Already exists");
            }

            sourceFileName = Path.GetFileName(sourceFileName); // delete path if it exist
            var sourceFileExtension = Path.GetExtension(sourceFileName);

            string destFileName;
            if (options.UseHashAsFileName)
            {
                destFileName = $"{hexHash}{sourceFileExtension}";
            }
            else
            {
                destFileName = $"{sourceFileName}";
            }

            var destFilePath = Path.Combine(repositoryEntity.Path, destFileName);
            using (var destFileStream = System.IO.File.Create(destFilePath))
            {
                sourceFileStream.Seek(0, SeekOrigin.Begin);
                sourceFileStream.CopyTo(destFileStream);
                sourceFileStream.Close();
            }

            // Create file's entity
            var fileEntity = new Entities.File
            {
                SourceName = sourceFileName.ToLower(),
                RepositoryId = repositoryId,
                HexHash = hexHash,
                Name = destFileName.ToLower(),
                FilePermissonList = permissions.Select(up => new FilePermission
                                    {
                                        UserName = up.UserName,
                                        PermissionId = (int)up.Access
                                    }).ToList()

            };            
            context.Files.Add(fileEntity); // add file's entity to database            
            context.SaveChanges(); // send changes into database

            return fileEntity.Id;
        }
        
        /// <summary>
        /// Метод для удаление файла с указанием владельца
        /// </summary>
        /// <remarks>Метод удаляет файл на файловой системе и соответствующую запись из базы данных</remarks>
        /// <param name="fileId">Id файла в базе данных</param>
        /// <param name="userName">
        /// Данный параметр необходим: 1) Если необходимо проверить права на удаление, 2) Если имя файла содержит маску {userName}
        /// </param>                
        public void Delete(int fileId, string userName)
        {
            var filePermission = new FilePermission
            {
                UserName = userName,
                PermissionId = 2
            };

            var fileEntity = TryGetFileEntity(fileId, filePermission);
            if (fileEntity == null)
                throw new ArgumentException($"{nameof(fileId)}: {fileId} or {nameof(userName)}: {userName} is invalid");
            
            // Delete file system object
            var filePath = GetFilePath(userName, fileEntity);
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
        [SuppressMessage("ReSharper", "SuggestVarOrType_Elsewhere")]
        public string GetFileBase64String(int fileId, string userName)
        {
            var fileEntity = context.Files.Single(file => file.Id == fileId &&
                                                          file.FilePermissonList.Any(fp => fp.UserName == userName && fp.PermissionId == (int)Access.Read));
            var fileName = fileEntity.Name.Replace("{userName}", userName);

            var filePath = Path.Combine(fileEntity.Repository.Path, fileName);
            byte[] bytes = System.IO.File.ReadAllBytes(filePath);
            var base64String = Convert.ToBase64String(bytes);

            return base64String;
        }

        /// <summary>
        /// Получения base64String файла
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        [SuppressMessage("ReSharper", "SuggestVarOrType_Elsewhere")]
        public string GetFileBase64String(int fileId)
        {
            var fileEntity = context.Files.Single(file => file.Id == fileId && !file.Name.Contains("{userName}"));
            var filePath = Path.Combine(fileEntity.Repository.Path, fileEntity.Name);
            byte[] bytes = System.IO.File.ReadAllBytes(filePath);
            var base64String = Convert.ToBase64String(bytes);

            return base64String;
        }
        
        /// <summary>
        /// Get file stream for user
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public FileStream GetFileStream(int fileId, string userName)
        {                                
            var filePath = TryGetFilePath(userName, fileId); // get file path
            if (filePath == null)
                throw new FileNotFoundOrAccessException();
            
            var fileStream = System.IO.File.OpenRead(filePath); // get file stream

            return fileStream;
        }

        /// <summary>
        /// Get file stream without specify user
        /// </summary>
        /// <remarks>File name do not have to has pattern {userName}</remarks>
        /// <param name="fileId"></param>
        /// <returns></returns>
        public FileStream GetFileStream(int fileId)
        {
            var fileEntity = context.Files.SingleOrDefault(file => file.Id == fileId && !file.Name.Contains("{userName}"));
            if (fileEntity == null)
                throw new FileNotFoundException();

            var filePath = Path.Combine(fileEntity.Repository.Path, fileEntity.Name);
            var fileStream = System.IO.File.OpenRead(filePath);

            return fileStream;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tiffFilePath"></param>
        /// <returns></returns>
        /// TODO: ref
        public string ConvertTiffToJpegBase64(string tiffFilePath)
        {            
            using(FileStream fs = new FileStream(tiffFilePath, FileMode.Open))
            {
                return ConvertTiffToJpegBase64(fs);
            }
        }

        public string ConvertTiffToJpegBase64(FileStream tiffFileStream)
        {
            var image = Image.FromStream(tiffFileStream);
            string base64String;
            using (var memoryStream = new MemoryStream())
            {
                image.Save(memoryStream, ImageFormat.Jpeg);
                base64String = Convert.ToBase64String(memoryStream.ToArray());
            }
            tiffFileStream.Close();
            return base64String;
        }

        public bool CheckIfFileExists(string hash, int repositoryId)
        {
            //var hash = GetHash(fileStream);
            if (context.Files.Any(file => file.RepositoryId == repositoryId && file.HexHash.Equals(hash))) // check exist dublicate in repository by hexHash
                return true;

            return false;
        }
        #endregion

        #region Private methods       

        /// <summary>
        /// Получает объект File из базы даных
        /// </summary>
        /// <remarks>При получении объекта идет проверка уровня доступа</remarks>
        /// <param name="fileId"></param>
        /// <param name="filePermission">Данный параметр не валидируется так как его создал метод текущего класса</param>
        /// <returns></returns>
        private Entities.File TryGetFileEntity(int fileId, FilePermission filePermission)
        {            
            var fileEntity = context.Files.SingleOrDefault(file => file.Id == fileId && file.FilePermissonList.Any(fp => fp.UserName == filePermission.UserName && fp.PermissionId == filePermission.PermissionId));                                                                

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
        private string TryGetFilePath(string userName, int fileId)
        {
            var filePermission = new FilePermission
            {
                UserName = userName,
                PermissionId = 1
            };
            var fileEntity = TryGetFileEntity(fileId, filePermission);
            if (fileEntity == null)
                return null;

            var filePath = GetFilePath(userName, fileEntity);            

            return filePath;
        }

        /// <summary>
        /// Получение пути к файлу - полное название файла
        /// </summary>
        /// <param name="userName">
        /// Данный параметр необходим не для авторизации, а для обработки названия файла.
        /// Если в названии файла будет присутствовать паттерн "...{userName}...***", то он будет заменен значением данного параметра.
        /// </param>
        /// <param name="fileEntity"></param>
        /// <returns></returns>
        private static string GetFilePath(string userName, Entities.File fileEntity)
        {            
            var fileName = fileEntity.Name.Replace("{userName}", userName);            
            var filePath = Path.Combine(fileEntity.Repository.Path, fileName); // generate filePath in repository  

            return filePath;
        }       

        /// <summary>
        /// Получить хэш потока
        /// </summary>
        /// <param name="fileStream">поток</param>
        /// <returns>хэш</returns>
        private string GetHash(Stream fileStream)
        {
            string hexHash;
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(fileStream);
                hexHash = BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
            return hexHash;
        }

        #endregion
    }
}