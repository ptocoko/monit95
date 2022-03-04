//using Ionic.Zip;
//using Monit95App.Infrastructure.Data;
//using Monit95App.Services;
//using Monit95App.Services.DTOs;
//using Monit95App.Services.Interfaces;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Net.Http.Headers;
//using System.Web.Http;

//namespace Monit95App.Api
//{
//    [Authorize(Roles = "school")]
//    public class ResultReportController : ApiController //This API class freezed for better times...
//    {
//        private readonly IParticipResults _participResults;
//        private readonly CokoContext _context;

//        public ResultReportController(IParticipResults participResults, CokoContext context)
//        {
//            _participResults = participResults;
//            _context = context;
//        }
        
//        [HttpGet]
//        public HttpResponseMessage GetReport(int participTestId)
//        {
//            if (!ModelState.IsValid) return new HttpResponseMessage(HttpStatusCode.BadRequest);

//            var particip = _participResults.GetClassParticipReportDto(participTestId);

//            var pdfBytes = (new ClassParticipReporter()).GetClassParticipReportBytes(particip, new string[] { "4", "1", "3", "1", "1" }, "17 Сентября 2017 г.");

//            HttpResponseMessage response = new HttpResponseMessage
//            {
//                Content = new ByteArrayContent(pdfBytes),
//                StatusCode = HttpStatusCode.OK
//            };

//            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
//            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
//            return response;
//        }

//        [HttpGet]
//        public HttpResponseMessage GetReportsForSchool(string schoolId)
//        {
//            if (!ModelState.IsValid) return new HttpResponseMessage(HttpStatusCode.BadRequest);

//            var schoolParticipIdsFromSchool = _context.ParticipTests.Where(p => p.ProjectTestId == 1011 && p.Particip.SchoolId == schoolId).Select(s => s.Id).ToArray();
//            var participsDtos = _participResults.GetListClassParticipReportDto(schoolParticipIdsFromSchool);

//            byte[] zipFileBytes;
//            using (MemoryStream ms = new MemoryStream())
//            {
//                using (ZipFile zip = new ZipFile())
//                {
//                    byte[] pdfBytes;
//                    ClassParticipReporter reporter = new ClassParticipReporter();
//                    foreach (var participDto in participsDtos.Take(2))
//                    {
//                        pdfBytes = reporter.GetClassParticipReportBytes(participDto, new string[] { "4", "1", "3", "1", "1" }, "26 сентября 2017 года");
//                        zip.AddEntry($"{participDto.ClassName}/{participDto.SchoolParticipInfo.Surname} {participDto.SchoolParticipInfo.Name}.pdf", pdfBytes);
//                    }
//                    zip.Save(ms);
//                }
//                zipFileBytes = ms.ToArray();
//            }

//            HttpResponseMessage response = new HttpResponseMessage
//            {
//                Content = new ByteArrayContent(zipFileBytes),
//                StatusCode = HttpStatusCode.OK
//            };

//            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/zip");
//            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
//            return response;
//        }
//    }
//}
