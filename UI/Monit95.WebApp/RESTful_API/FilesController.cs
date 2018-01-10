using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using Monit95App.Services.File;

namespace Monit95.WebApp.RESTful_API
{
    /// <inheritdoc />
    /// <summary>
    /// Контроллер для работы с файлами бланков ответов
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
        [HttpPost]
        [Route("~/api/repositories/{id:int}/files")]        
        [SuppressMessage("ReSharper", "SuggestVarOrType_SimpleTypes")]
        public HttpResponseMessage AddFileToRepository()
        {
            var repositoryId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);

            // Find file in requestBody
            var httpFileCollection = HttpContext.Current.Request.Files;
            if (httpFileCollection.Count == 0)            
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Body has not file");            
                   
            // Get file's content from body
            HttpPostedFile postedFile = httpFileCollection.Get(0);

            // Call service
            var result = fileService.Add(repositoryId, postedFile.InputStream, postedFile.FileName, User.Identity.Name);            

            // Success
            if (!result.Errors.Any())            
                return Request.CreateResponse(HttpStatusCode.Created, Convert.ToInt32(result.Result));

            // Error: dublicate
            if (result.Errors.Any(error => error.HttpCode == 409))
                return Request.CreateErrorResponse(HttpStatusCode.Conflict, string.Empty);

            // Error: another
            foreach (var error in result.Errors)                         
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);            
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);            
        }

        //[HttpPost, Route("~/api/files/{id:int}")]        
        //public IHttpActionResult DeleteFile()
        //{
        //    var fileId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);            

        //    var result = fileService.Delete(fileId, User.Identity.Name);

        //    // Success
        //    if (!result.Errors.Any())
        //        return Ok();

        //    // Faild
        //    foreach (var error in result.Errors)
        //        ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
        //    return BadRequest(ModelState);
        //}

        //[HttpGet, Route("~/api/files/{id:int}/url")]
        //public IHttpActionResult GetUrl()
        //{
        //    var fileId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
        //    var urlImagesFolder = HostingEnvironment.MapPath("~/Images/url-images");
        //    var result = fileService.GetFileName(fileId, User.Identity.Name, urlImagesFolder);
        //    //var result = fileService.GetFileName(fileId, urlImagesFolder, "201");

        //    // Success
        //    if (!result.Errors.Any())
        //        return Ok(result.Result);

        //    // Faild
        //    foreach (var error in result.Errors)
        //        ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
        //    return BadRequest(ModelState);            
        //}

        [HttpGet, Route("~/api/files/{id:int}/content")]
        public HttpResponseMessage GetFileContent()
        {
            var fileId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            var result = fileService.GetFileContent(fileId, User.Identity.Name);

            // Success
            if (!result.Errors.Any())
            {
                var httpResponseMessage = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StreamContent(result.Result),
                };
                httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");

                return httpResponseMessage;
            }                

            // Faild
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        }
    }
}
