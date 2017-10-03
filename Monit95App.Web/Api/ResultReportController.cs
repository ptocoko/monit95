using Monit95App.Services;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize]
    public class ResultReportController : ApiController
    {
        private readonly IParticipResults _participResults;

        public ResultReportController(IParticipResults participResults)
        {
            _participResults = participResults;
        }

        [HttpGet]
        public HttpResponseMessage Get(int participTestId)
        {
            if (!ModelState.IsValid) return new HttpResponseMessage(HttpStatusCode.BadRequest);

            var particip = _participResults.GetClassParticipReportDto(participTestId);

            var pdfBytes = (new ClassParticipReporter()).GetClassParticipReportBytes(particip, new string[] { "4", "1", "3", "1", "1" }, "17 Сентября 2017 г.");

            HttpResponseMessage response = new HttpResponseMessage
            {
                Content = new ByteArrayContent(pdfBytes),
                StatusCode = System.Net.HttpStatusCode.OK
            };

            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            return response;
        }
    }
}
