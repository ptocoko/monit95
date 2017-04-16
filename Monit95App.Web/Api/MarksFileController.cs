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
        private IMarksFileService _marksFileService { get; }
        
        public MarksFileController()
        {
            _marksFileService = new MarksFileService(@"d:\collector");
        }

        public MarksFileController(IMarksFileService marksFileService)
        {
            _marksFileService = marksFileService;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> UploadFile()
        {
//            string serverPath = @"\\192.168.88.220\\файлы_пто\[2016-61] - РСУР\Сбор";
            //string serverPath = @"d:\";
            //var provider = new MultipartFormDataStreamProvider(serverPath);
            //var result = await Request.Content.ReadAsMultipartAsync(provider);            
            

            HttpFileCollection hfc = HttpContext.Current.Request.Files;
            HttpPostedFile hpf = hfc[0];            
            var formVarCollection = HttpContext.Current.Request.Form;
            var userName = formVarCollection.GetValues("username").SingleOrDefault();

            await _marksFileService.SaveAsync(hpf, userName);


            //return this.Request.CreateResponse(HttpStatusCode.BadRequest, "Не верный файл");
            return Request.CreateResponse(HttpStatusCode.Created);
        }

        public async Task<bool> IsExistFile(string fullFileName)
        {            


            return true;
        }
    }
}
