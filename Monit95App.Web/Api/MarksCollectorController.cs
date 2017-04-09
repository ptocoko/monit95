using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Monit95App.Api
{    
    public class MarksCollectorController : ApiController
    {
        public MarksCollectorController()
        {

        }

        [HttpPost]
        public string UploadFile()
        {
            HttpFileCollection hfc = HttpContext.Current.Request.Files;
            HttpPostedFile hpf = hfc[0];            

            return "Good!";
        }
    }
}
