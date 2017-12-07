﻿using Monit95App.Services.RepositoryService;
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
        /// Добавление файла в репозиторий
        /// </summary>
        /// <returns>fileId</returns>
        [HttpPost, Route("{id:int}/files")]
        [Authorize(Roles = "area")]
        [SuppressMessage("ReSharper", "SuggestVarOrType_SimpleTypes")]
        public HttpResponseMessage AddFile()
        {
            var httpCollectionFiles = HttpContext.Current.Request.Files;
            if(httpCollectionFiles.Count == 0)            
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "В теле запроса отсутствует файл");
            
            HttpPostedFile postedFile = httpCollectionFiles.Get(0);
            Stream fileStream = postedFile.InputStream;

            var repositoryId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);            
            var fileName = postedFile.FileName;
            var areaCode = Convert.ToInt32(User.Identity.Name);

            var result = repositoryService.Add(repositoryId, fileStream, fileName, areaCode);

            // success
            if (!result.Errors.Any())            
                return Request.CreateResponse(HttpStatusCode.Created, Convert.ToInt32(result.Result));            

            // faild
            foreach (var error in result.Errors)
            {
                if (error.HttpCode == 409)
                    return Request.CreateErrorResponse(HttpStatusCode.Conflict, error.Description);

                this.ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);            
        }
    }
}
