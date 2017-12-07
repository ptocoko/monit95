using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Monit95App.Services.Repository;

namespace Monit95.WebApp.RESTful_API.Rsur
{
    /// <inheritdoc />
    /// <summary>
    /// Контроллер для работы с файлами бланков ответов
    /// </summary>    
    [RoutePrefix("api/repositories")]
    public class RepositoriesController : ApiController
    {
        #region Dependencies

        private readonly IRepositoryService repositoryService;
        
        #endregion

        #region Constructors

        public RepositoriesController(IRepositoryService repositoryService)
        {
            this.repositoryService = repositoryService;
        }

        #endregion

        /// <summary>
        /// Добавление файла в репозиторий
        /// </summary>
        /// <returns>fileId</returns>
        [HttpPost, Route("{id:int}/files")]
        [Authorize(Roles = "area")]
        [SuppressMessage("ReSharper", "SuggestVarOrType_SimpleTypes")]
        public HttpResponseMessage AddFile()
        {
            // Find file in requestBody
            var httpCollectionFiles = HttpContext.Current.Request.Files;
            if (httpCollectionFiles.Count == 0)            
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Body has not file");            
                   
            // Get file's content from body
            HttpPostedFile postedFile = httpCollectionFiles.Get(0);            
            var repositoryId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);                        
            var areaCode = Convert.ToInt32(User.Identity.Name);

            // Call service
            var result = repositoryService.Add(repositoryId, postedFile.InputStream, postedFile.FileName, areaCode);

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

        [HttpPost, Route("{repoId:int}/files/{fileId:}")]
        [Authorize(Roles = "area")]
        public HttpResponseMessage DeleteFile()
        {
            var fileId = Convert.ToInt32(RequestContext.RouteData.Values["fileId"]);
            return null;
        }
    }
}
