using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Http;
using Monit95App.Services.Rsur.ParticipReport;
using System.Runtime.Caching;
using Monit95App.Services.Validation;
using System.Linq;

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

        /// <summary>
        /// Получить КАРТУ предметной компентнции учителя
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Get()
        {
            var rsurParticipTestId = int.Parse(RequestContext.RouteData.Values["rsurParticipTestId"].ToString());

            ServiceResult<ParticipExtendReport> result = null;
            if (User.IsInRole("area"))            
                result = participReportService.GetExtendReport(rsurParticipTestId, areaCode: Convert.ToInt32(User.Identity.Name));

            if (User.IsInRole("school"))
                result = participReportService.GetExtendReport(rsurParticipTestId, schoolId: User.Identity.Name);

            // Success
            if (!result.Errors.Any())                            
                return Ok(result.Result);            

            // Error: another
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);

            return BadRequest(ModelState);                       
        }

        /// <summary>
        /// Получить список отчетов по участникам
        /// </summary>
        /// <returns></returns>
        [HttpGet]   
        [Route("")]
        public IHttpActionResult GetAll()
        {
            // Если кэш содержит подходящие данные, то возвращаем их
            if (memoryCache.Contains(PROTOCOLS_CACHE_KEY))
                return Ok(memoryCache.Get(PROTOCOLS_CACHE_KEY));            

            ServiceResult<IEnumerable<ParticipReport>> result;            
            if (User.IsInRole("area"))
            {
                var areaCode = int.Parse(User.Identity.Name);
                result = participReportService.GetReportsForArea(areaCode);                
            }
            else // school
            {
                var schoolId = User.Identity.Name;
                result = participReportService.GetReportsForSchool(schoolId);                
            }

            // Success
            if (!result.Errors.Any())
            {
                memoryCache.Add(PROTOCOLS_CACHE_KEY, result.Result, DateTimeOffset.UtcNow.AddMinutes(10));
                return Ok(result.Result);
            }
                
            // Error: another
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            return BadRequest(ModelState);                        
        }
        
        #endregion
    }

    public class ReportTextDto
    {
        [Required]
        public string Text { get; set; }
    }
}
