using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Http;
// ReSharper disable CheckNamespace
namespace Monit95App.Web.Api
{
    using System.Linq;

    using Monit95App.Services.Interfaces;

    [Authorize]
    [RoutePrefix("api/ExcelFiles")]
    public class ExcelFilesController : ApiController
    {
        #region Dependencies

        private readonly IClassParticipImporter _classParticipImporter;
        private readonly IClassParticipConverter _classParticipConverter;
        private readonly IParticipService _participService;

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
        //[Route("")]
        public IHttpActionResult Upload()
        {            
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count != 1)
            {
                return BadRequest();
            }
            var httpPostedFile = httpRequest.Files[0];

            if(Path.GetExtension(httpPostedFile.FileName) != ".xlsx")
            {
                return BadRequest();
            }        

            var stream = httpPostedFile.InputStream;
            stream.Position = 0;

            var (classParticips, rowNumbersWithError) = _classParticipImporter.ImportFromExcelFileStream(stream, new List<int> { 1 });
            bool hasRowsWithError = rowNumbersWithError != null;
            var particips = _classParticipConverter.ConvertToParticipDto(classParticips, User.Identity.Name, 201777);


            foreach (var particip in particips)
            {
                _participService.Add(particip);
            }
                

            return Ok(new {
                              CountOfAddedParticips = particips.Count(),
                              HasRowsWithError = hasRowsWithError,
                              RowNumbersWithError = rowNumbersWithError
                          });
        }

        #endregion
    }
}
