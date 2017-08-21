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

        #endregion

        public ExcelFilesController(IClassParticipImporter classParticipImporter,
                                    IClassParticipConverter classParticipConverter)
        {
            _classParticipImporter = classParticipImporter;
            _classParticipConverter = classParticipConverter;
        }

        #region APIs

        [HttpPost]
        [Route("")]
        public IHttpActionResult Upload()
        {            
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count != 1)
            {
                return BadRequest();
            }
            var httpPostedFile = httpRequest.Files[0];

            if(Path.GetExtension(httpPostedFile.FileName) != "xlsx")
            {
                return BadRequest();
            }        

            var stream = httpRequest.Files[0].InputStream;

            return Ok();
        }

        #endregion
    }
}
