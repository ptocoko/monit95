using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    using Microsoft.AspNet.Identity;

    using Monit95App.Services.Interfaces;

    [Authorize(Roles = "school")]
    [RoutePrefix("api/Documents")]
    public class DocumentsController : ApiController
    {
        #region Dependencies

        private readonly IDocumentService documentService;

        #endregion

        public DocumentsController(IDocumentService documentService)
        {
            this.documentService = documentService;
        }

        [HttpGet]
        [Route("")]        
        public IHttpActionResult Get()
        {
            var userName = User.Identity.GetUserName();          
            var dtos = documentService.GetAllBySchoolId(userName);   

            return Ok(dtos);
        }
    }
}
