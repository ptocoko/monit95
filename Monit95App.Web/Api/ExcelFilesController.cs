using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize]
    [RoutePrefix("api/ExcelFiles")]
    public class ExcelFilesController : ApiController
    {
        [HttpPost]
        [Route("")]
        public IHttpActionResult Upload()
        {            
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count != 1)
            {
                return BadRequest();
            }
            var stream = httpRequest.Files[0].InputStream;

            return Ok();
        }
    }
}
