using Monit95App.Infrastructure.Business.Interfaces.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{    
    [Authorize]
    public class FilesController : ApiController
    {
        private readonly IRsurReportModelService _rsurReportModelService;

        public FilesController(IRsurReportModelService rsurReportModelService)
        {
            _rsurReportModelService = rsurReportModelService;
        }

        [Route("/api/files/rsurParticipLists/{id}")]
        public async Task<HttpRequestMessage> Get(string id) //id = userName
        {

            //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            //var stream = new FileStream(path, FileMode.Open, FileAccess.Read);

            //response.Content = new StreamContent(stream);
            //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            //return response;

            return new HttpRequestMessage();
        }
    }
}
