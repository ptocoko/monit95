using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    using System.IO;
    using System.Net.Http.Headers;

    [Authorize]
    [RoutePrefix("api/FileRepositories")]
    public class FileRepositoriesController : ApiController
    {
        #region Fields

        private const string RootPath = @"c:\FileRepositories";

        #endregion

        #region APIs
        
        [HttpGet]
        [Authorize(Roles = "area")]
        public HttpResponseMessage Get(string filePath) 
        {
            var fullFilePath = Path.Combine(RootPath, filePath); // check exist file
            
            var stream = new FileStream(fullFilePath, FileMode.Open, FileAccess.Read);
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
