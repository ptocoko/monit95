using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Http;
// ReSharper disable CheckNamespace
namespace Monit95App.Web.Api
{
    using System.Linq;

    using Monit95App.Services.Interfaces;
    using System.Data.Entity.Infrastructure;
    using System.Net.Http;
    using System.Reflection;
    using System.Net.Http.Headers;
    using Monit95App.Services;
    using System.Data.SqlClient;

    //[Authorize(Roles = "school")]
    [RoutePrefix("api/ExcelFiles")]
    public class ExcelFilesController : ApiController
    {
        #region Dependencies

        private readonly IClassParticipImporter _classParticipImporter;
        private readonly IClassParticipConverter _classParticipConverter;
        private readonly IParticipService _participService;

        private readonly List<int> CLASS_NUMBERS = new List<int> { 1 };

        #endregion

        public ExcelFilesController(IClassParticipImporter classParticipImporter,
                                    IClassParticipConverter classParticipConverter,
                                    IParticipService participService)
        {
            _classParticipImporter = classParticipImporter;
            _classParticipConverter = classParticipConverter;
            _participService = participService;
        }

        #region APIs

        [HttpPost]
        [Route("Upload")]
        public IHttpActionResult Upload()
        {            
            var httpRequest = HttpContext.Current.Request;
            
            //if (httpRequest.Files.Count != 1)
            //{
            //    return BadRequest();
            //}
            //var httpPostedFile = httpRequest.Files[0];

            //if(Path.GetExtension(httpPostedFile.FileName) != ".xlsx")
            //{
            //    return BadRequest();
            //}        

            //var stream = httpPostedFile.InputStream;

            //var (classParticips, rowNumbersWithError) = _classParticipImporter.ImportFromExcelFileStream(stream, CLASS_NUMBERS);
            //bool hasRowsWithError = rowNumbersWithError != null;
            //var particips = _classParticipConverter.ConvertToParticipDto(classParticips, User.Identity.Name, 1);

            //int countOfAddedParticips = 0;
            //for (int i = 0; i < particips.Count; i++)
            //{
            //    int addingResult = _participService.Add(particips[i]);
            //    if(addingResult != -1)
            //    {
            //        countOfAddedParticips++;
            //    }
            //}
            
            //return Ok(content: new {
            //                  CountOfReadParticips = particips.Count,
            //                  CountOfAddedParticips = countOfAddedParticips,
            //                  HasRowsWithError = hasRowsWithError,
            //                  RowNumbersWithError = rowNumbersWithError
            //              });
            for(int i = 0; i < httpRequest.Files.Count; i++)
            {
                var file = httpRequest.Files[i];
                file.SaveAs("D:\\image_" + i + Path.GetExtension(file.FileName));
            }
            return Ok();
        }

        [HttpGet]
        public HttpResponseMessage GetExcelTemplate()
        {
            var assembly = Assembly.GetAssembly(typeof(IClassParticipImporter));
            var buffer = new byte[16 * 1024];
            byte[] bytes;

            using (Stream s = assembly.GetManifestResourceStream("Monit95App.Services.Resource.template.xlsx"))
            {
                if (s is MemoryStream)
                {
                    bytes = ((MemoryStream)s).ToArray();
                }
                else
                {
                    s.Position = 0;
                    using (MemoryStream ms = new MemoryStream())
                    {
                        int read;
                        while ((read = s.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            ms.Write(buffer, 0, read);
                        }
                        bytes = ms.ToArray();
                    }
                }
            }

            HttpResponseMessage response = new HttpResponseMessage
            {
                Content = new ByteArrayContent(bytes),
                StatusCode = System.Net.HttpStatusCode.OK
            };
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            return response;
        }

        #endregion
    }
}
