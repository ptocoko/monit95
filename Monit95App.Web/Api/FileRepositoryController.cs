using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    using Monit95App.Services.Interfaces;
    using System.IO;
    using System.Net.Http.Headers;

    [Authorize]
    [RoutePrefix("api/FileRepository")]
    public class FileRepositoryController : ApiController
    {
        #region Dependencies

        private readonly IFileRepositoryManager fileRepositoryManager;

        #endregion

        public FileRepositoryController(IFileRepositoryManager fileRepositoryManager)
        {
            this.fileRepositoryManager = fileRepositoryManager;
        }

        #region APIs

        [HttpGet]
        [Authorize(Roles = "area")]
        public HttpResponseMessage Get(string filePath) 
        {            
            var stream = fileRepositoryManager.GetFileStream(filePath, User.Identity.Name);

            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StreamContent(stream)                
            };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            
            return response;
        }

        #endregion
    }
}
