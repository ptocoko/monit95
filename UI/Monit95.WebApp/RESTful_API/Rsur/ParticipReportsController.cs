using System;
using System.Web.Http;
using Monit95App.Services.Rsur.ParticipReport;
using System.Linq;
using ServiceResult;

namespace Monit95App.RESTful_API.Rsur
{
    [RoutePrefix("api/rsur/participReports")]
    [Authorize(Roles = "area, rsur-particip, school")]
    public class RsurParticipReportsController : ApiController
    {
        #region Dependencies

        private readonly IParticipReportService participReportService;
        
        #endregion

        public RsurParticipReportsController(IParticipReportService participReportService)
        {
            this.participReportService = participReportService;
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
        /// 
        /// </summary>
        /// <param name="options">query options</param>
        /// <returns></returns>
        [HttpGet]   
        [Route("")]
        public IHttpActionResult GetAll([FromUri]ReportsListOptions options)
        {
            options = options ?? new ReportsListOptions();
            ServiceResult<ReportsListDto> result;
            if (User.IsInRole("area"))
            {
                var areaCode = int.Parse(User.Identity.Name);
                result = participReportService.GetReports(options: options, areaCode: areaCode);
            }
            else // school
            {
                var schoolId = User.Identity.Name;
                result = participReportService.GetReports(options: options, schoolId: schoolId);
            }

            // Success
            if (!result.Errors.Any())
            {
                return Ok(result.Result);
            }
                
            // Error: another
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            return BadRequest(ModelState);                        
        }

        [HttpGet]
        [Route("info")]
        public IHttpActionResult GetReportsInfo()
        {
            var result = new ServiceResult<ReportsInfo>();
            if (User.IsInRole("area"))
            {
                var areaCode = int.Parse(User.Identity.Name);
                result = participReportService.GetReportsInfo(areaCode: areaCode);
            }
            else
            {
                var schoolId = User.Identity.Name;
                result = participReportService.GetReportsInfo(schoolId: schoolId);
            }

            if (!result.Errors.Any())
            {
                return Ok(result.Result);
            }

            // Error: another
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.HttpCode.ToString(), error.Description);
            return BadRequest(ModelState);
        }

        #endregion
    }
}
