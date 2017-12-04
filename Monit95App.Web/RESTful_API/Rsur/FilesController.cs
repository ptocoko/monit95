using Monit95App.Services.Rsur.SeminarReport;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Web;
using System.Web.Hosting;
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


            var httpRequest = HttpContext.Current.Request;

            var imagesFolder = HostingEnvironment.MapPath("~/Images/seminar-photos");
            for (var i = 0; i < httpRequest.Files.Count; i++)
            {
                var file = httpRequest.Files[i];
                var fileExtension = Path.GetExtension(file.FileName);
                SeminarReportService.SaveFile(file.InputStream, fileExtension, reportId, i + 1, imagesFolder);
            }

            return Ok();
        }
    }
}
