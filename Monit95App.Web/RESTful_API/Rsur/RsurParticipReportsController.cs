using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Http;
using Monit95App.Services.Rsur.ParticipReport;
using WebApi.OutputCache.V2;
using System.Web;
using System.IO;
using System.Runtime.Caching;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Caching;

namespace Monit95App.RESTful_API.Rsur
{
    [RoutePrefix("api/rsur/participReports")]
    [Authorize(Roles = "area, rsur-particip, school")]
    public class RsurParticipReportsController : ApiController
    {
        #region Dependencies

        private readonly IParticipReportService participReportService;

        private MemoryCache memoryCache = MemoryCache.Default;
        private const string PROTOCOLS_CACHE_KEY = "testProtocols";
        private static string previousRequestUser = "";

        #endregion


        public RsurParticipReportsController(IParticipReportService participReportService)
        {
            this.participReportService = participReportService;

            //если UserName текущего запроса не совпадает с UserName предыдущего запроса, то удаляем данные из кэша
            if (!String.Equals(previousRequestUser, User.Identity.Name, StringComparison.CurrentCultureIgnoreCase))
            {
                if (memoryCache.Contains(PROTOCOLS_CACHE_KEY))
                {
                    memoryCache.Remove(PROTOCOLS_CACHE_KEY);
                }
                previousRequestUser = User.Identity.Name;
            }
        }

        #region APIs

        [HttpGet]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Get()
        {
            var rsurParticipTestId = int.Parse(RequestContext.RouteData.Values["rsurParticipTestId"].ToString());
            var report = participReportService.GetReport(rsurParticipTestId);

            return Ok(report);
        }

        [HttpGet]   
        [Route("")]
        public IHttpActionResult Get(string testDate)
        {
            //если кэш содержит подходящие данные, то возвращаем их
            if (memoryCache.Contains(PROTOCOLS_CACHE_KEY))
            {
                return Ok(memoryCache.Get(PROTOCOLS_CACHE_KEY));
            }

            if (!DateTime.TryParse(testDate, out DateTime testDateObj)) return BadRequest("Cannot parse testDate string to DateTime object");

            IEnumerable<ParticipReport> rsurResults = null;
            if (User.IsInRole("area"))
            {
                var areaCode = int.Parse(User.Identity.Name);
                try
                {
                    rsurResults = participReportService.GetResultsForArea(areaCode, testDateObj);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else if(User.IsInRole("school"))
            {
                var schoolId = User.Identity.Name;
                try
                {
                    rsurResults = participReportService.GetResultsForSchool(schoolId, testDateObj);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else if (User.IsInRole("rsur-particip"))
            {
                var participCode = int.Parse(User.Identity.Name);
                try
                {
                    rsurResults = participReportService.GetResultsForParticip(participCode, testDateObj);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }

            }

            memoryCache.Add(PROTOCOLS_CACHE_KEY, rsurResults, DateTimeOffset.UtcNow.AddMinutes(10));

            return Ok(rsurResults);
        }
        
        #endregion
    }

    public class ReportTextDto
    {
        [Required]
        public string Text { get; set; }
    }
}
