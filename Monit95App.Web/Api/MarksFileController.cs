using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Monit95App.Services;

namespace Monit95App.Web.Api
{    
    public class MarksFileController : ApiController
    {
        private readonly IMarksFileService _marksFileService;
        
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
            var hfc = HttpContext.Current.Request.Files;
            var hpf = hfc[0];            
            var formVarCollection = HttpContext.Current.Request.Form;
            var userName = formVarCollection.GetValues("username").SingleOrDefault();

            _marksFileService.SaveAsync(hpf, userName);
            
            return Request.CreateResponse(HttpStatusCode.Created);
        }
      
    }
}
