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
        static List<ClassParticipReportDto> particips = new List<ClassParticipReportDto>
        {
            new ClassParticipReportDto
            {
                ParticipTestId = 17,
                Fio = "Эсамбаев Хусайн Арбиевич",
                ClassName = "1 А",
                SchoolName = "Школа Крутости №1",
                GradeGroup = "Группа самых крутых",
                Marks = new double[] { 4, 1, 2, 0.5, 1 },
                PrimaryMark = 17
            },
            new ClassParticipReportDto
            {
                ParticipTestId = 18,
                Fio = "Эсамбаев Хусайн Арбиевич",
                ClassName = "1 Б",
                SchoolName = "Школа Крутости №1",
                GradeGroup = "Группа самых крутых",
                Marks = new double[] { 4, 1, 2, 0.5, 1 },
                PrimaryMark = 17
            }
        };

        [HttpGet]
        public HttpResponseMessage Get(int participTestId)
        {
            if (!ModelState.IsValid) return new HttpResponseMessage(HttpStatusCode.BadRequest);

            var particip = particips.Single(s => s.ParticipTestId == participTestId);

            var pdfBytes = (new ClassParticipReporter()).GetClassParticipReportBytes(particip, new string[] { "4", "1", "2", "1", "1" }, "17 Сентября 2017 г.");

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
