using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    using Microsoft.AspNet.Identity;

    [Authorize(Roles = "school")]
    [RoutePrefix("api/Documents")]
    public class DocumentsController : ApiController
    {
        [HttpGet]
        [Route("")]        
        public IHttpActionResult Get()
        {
            var userName = User.Identity.GetUserName();          
            var dtos = _documentService.GetAll(userName);   

            return Ok(dtos);
        }
    }
}
