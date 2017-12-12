﻿using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Monit95App.Services.File;

namespace Monit95.WebApp.RESTful_API
{
    /// <inheritdoc />
    /// <summary>
    /// Контроллер для работы с файлами бланков ответов
    /// </summary>    
    [RoutePrefix("api/files")]
    public class RepositoriesController : ApiController
    {
        #region Dependencies

        private readonly IFileService fileService;
        
        #endregion

        #region Constructors

        public RepositoriesController(IFileService fileService)
        {
            this.fileService = fileService;
        }

        #endregion

        /// <summary>
        /// Добавление файла в репозиторий
        /// </summary>
        /// <returns>fileId</returns>
        [HttpPost]
        [Authorize(Roles = "area")]
        [SuppressMessage("ReSharper", "SuggestVarOrType_SimpleTypes")]
        public HttpResponseMessage AddFileToRepository(int repositoryId)
        {
            // Find file in requestBody
            var httpCollectionFiles = HttpContext.Current.Request.Files;
            if (httpCollectionFiles.Count == 0)            
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Body has not file");            
                   
            // Get file's content from body
            HttpPostedFile postedFile = httpCollectionFiles.Get(0);                                               

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

        [HttpPost, Route("~/api/files/{id:int}")]
        [Authorize(Roles = "area")]
        public IHttpActionResult DeleteFile()
        {
            var fileId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);            

            var result = fileService.Delete(fileId, User.Identity.Name);

            // Success
            if (!result.Errors.Any())
                return Ok();

            // Faild
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            return BadRequest(ModelState);
        }
    }
}