using Monit95App.Services.Mark;
using Monit95App.Services.Mark.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Monit95App.Api
{    
    public class MarksFileController : ApiController
    {
        private IMarksFileService _marksFileService;
        
        public MarksFileController()
        {
            _marksFileService = new MarksFileService(@"c:\collector");
        }

        public MarksFileController(IMarksFileService marksFileService)
        {
            _marksFileService = marksFileService;
        }

        [HttpPost]
        public HttpResponseMessage UploadFile()
        {           
            HttpFileCollection hfc = HttpContext.Current.Request.Files;
            HttpPostedFile hpf = hfc[0];            
            var formVarCollection = HttpContext.Current.Request.Form;
            var userName = formVarCollection.GetValues("username").SingleOrDefault();

            _marksFileService.SaveAsync(hpf, userName);

            //return this.Request.CreateResponse(HttpStatusCode.BadRequest, "Не верный файл");
            return Request.CreateResponse(HttpStatusCode.Created);
        }

        public async Task<bool> IsExistFile(string fullFileName)
        {            
            return true;
        }
    }
}
