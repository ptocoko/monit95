using Monit95App.Services;
using Monit95App.Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace Monit95App.Api
{
    public class ResultReportController : ApiController
    {        
        [HttpGet]
        public HttpResponseMessage Get(int participTestId)
        {
            return null;
        }
    }
}
