using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Web;
using System.Web.Http;

namespace Monit95App.RESTful_API.Rsur
{
    /// <inheritdoc />
    /// <summary>
    /// Контроллер для работы с файлами бланков ответов
    /// </summary>
    public class FilesController : ApiController
    {
        [HttpPost, Route("api/repositories/{id}/files")]
        [Authorize(Roles = "area")]
        [SuppressMessage("ReSharper", "SuggestVarOrType_SimpleTypes")]
        public IHttpActionResult PostReportFiles()
        {
            var repositoryId = int.Parse(RequestContext.RouteData.Values["id"].ToString());
            HttpPostedFile postedFile = HttpContext.Current.Request.Files.Get(0);
            Stream stream = postedFile.InputStream;
            var fileName = postedFile.FileName;
          

            return Ok();
        }
    }
}
