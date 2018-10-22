using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using Monit95App.Services.Exceptions;
using Monit95App.Services.File;

namespace Monit95.WebApp.RESTful_API
{
    /// <summary>
    /// Контроллер для работы с файлами
    /// </summary>
    [Authorize]
    public class FilesController : ApiController
    {
        #region Dependencies

        private readonly IFileService fileService;
        
        #endregion

        #region Constructors

        public FilesController(IFileService fileService)
        {
            this.fileService = fileService;
        }

        #endregion

        /// <summary>
        /// Добавление файла в указанный репозиторий
        /// </summary>        
        /// <returns>fileId</returns>
        // TODO: refactoring, поймать что дубликат
        [HttpPost]
        [Route("~/api/repositories/{repositoryId:int}/files")]        
        [SuppressMessage("ReSharper", "SuggestVarOrType_SimpleTypes")]
        public HttpResponseMessage AddFileToRepository([FromUri] int repositoryId, [FromUri] bool useHashAsFileName)
        {
            //var repositoryId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            // Find file in requestBody
            var httpFileCollection = HttpContext.Current.Request.Files;
            if (httpFileCollection.Count == 0)            
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Body has not file");
            // Get file's content from body
            HttpPostedFile postedFile = httpFileCollection.Get(0);
            Stream fileStream = postedFile.InputStream;
            // Call service
            int fileId;
            try
            {
                //if (fileService.CheckIfFileExists(fileStream, repositoryId))
                //{
                //    return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Такой файл уже существует в репозитории");
                //}

                fileId = fileService.Add(repositoryId, fileStream, postedFile.FileName, User.Identity.Name, useHashAsFileName);
            }
            catch(ArgumentException exception)
            {
                ModelState.AddModelError("Ошибка", exception);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            return Request.CreateResponse(HttpStatusCode.Created, fileId);
        }

        /// <summary>
        /// Удаление файла
        /// </summary>
        /// <returns></returns>
        [HttpDelete, Route("~/api/files/{id:int}")]
        public IHttpActionResult DeleteFile()
        {
            //TODO: сделать валидацию и при необходимости вернуть ошибку что такой файл не найден или нет досутпа для пользователя
            var fileId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);

            fileService.Delete(fileId, User.Identity.Name);

            return Ok();
        }

        /// <summary>
        /// Скачивание файла
        /// </summary>
        /// <returns></returns>
        [HttpGet, Route("~/api/files/{id}")]
        public HttpResponseMessage GetFileContent()
        {
            var userName = User.Identity.Name;
            userName = User.Identity.Name;
            var fileId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            FileStream fileStream;            
            try
            {
                fileStream = fileService.GetFileStream(fileId, userName);
            }
            catch(FileNotFoundOrAccessException exception)
            {
                ModelState.AddModelError("file", exception);
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ModelState);
            }            
            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StreamContent(fileStream)
            };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = Path.GetFileName(fileStream.Name)
            };


            return response;
        }
    }
}
