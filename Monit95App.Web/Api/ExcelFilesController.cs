using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
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
        #region Dependencies

        private readonly IClassParticipImporter _classParticipImporter;
        private readonly IClassParticipConverter _classParticipConverter;
        private readonly IParticipService _participService;

        #endregion

        public ExcelFilesController(IClassParticipImporter classParticipImporter,
                                    //IClassParticipConverter classParticipConverter,
                                    IParticipService participService)
        {
            _classParticipImporter = classParticipImporter;
           // _classParticipConverter = classParticipConverter;
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

            var (classParticips, rowNumbersWithError) = _classParticipImporter.ImportFromExcelFileStream(stream);
            bool hasRowsWithError = rowNumbersWithError != null;
            var particips = _classParticipConverter.ConvertToParticipDto(classParticips);

            foreach (var particip in particips)
                _participService.Add(particip);

            return Ok(new {
                              CountOfAddedParticips = particips.Count(),
                              HasRowsWithError = hasRowsWithError,
                              RowNumbersWithError = rowNumbersWithError
                          });
        }

        #endregion
    }
}
