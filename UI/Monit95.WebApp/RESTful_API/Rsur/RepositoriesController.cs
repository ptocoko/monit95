using Monit95App.Services.RepositoryService;
using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Monit95App.RESTful_API.Rsur
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

        #region All Constructors

        public RepositoriesController(IRepositoryService repositoryService)
        {
            this.repositoryService = repositoryService;
        }

        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <returns>fileId</returns>
        [HttpPost, Route("{id:int}/files")]
        //[Authorize(Roles = "area")]
        [SuppressMessage("ReSharper", "SuggestVarOrType_SimpleTypes")]
        public HttpResponseMessage AddFile()
        {
            var httpCollectionFiles = HttpContext.Current.Request.Files;
            if(httpCollectionFiles.Count == 0)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "В теле запроса отсутствует файл");
            }
            HttpPostedFile postedFile = httpCollectionFiles.Get(0);
            Stream fileStream = postedFile.InputStream;
            var repositoryId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);            
            var fileName = postedFile.FileName;

            var result = repositoryService.Add(repositoryId, fileStream, fileName);

            // faild
            if (!result.Errors.Any())
            {
                return Request.CreateResponse(HttpStatusCode.Created, Convert.ToInt32(result.Result));
            }

            // success
            foreach (var error in result.Errors)
            {
                this.ModelState.AddModelError(string.Empty, error);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);            
        }
    }
}
