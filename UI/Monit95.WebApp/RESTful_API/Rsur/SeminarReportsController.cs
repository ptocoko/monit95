using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security;
using System.Web;
using System.Web.Http;
using Monit95App.Services.Rsur.SeminarReport;

namespace Monit95.WebApp.RESTful_API.Rsur
{
    [RoutePrefix("api/rsur/seminarReports")]
    [Authorize(Roles = "area, school")]    
    public class SeminarReportsController : ApiController
    {
        #region Dependencies

        private readonly ISeminarReportService seminarReportService;        

        #endregion

        public SeminarReportsController(ISeminarReportService seminarReportService)
        {
            this.seminarReportService = seminarReportService;            
        }

        #region Endpoins                                  

        /// <summary>
        /// Get report list by user
        /// </summary>
        /// <remarks>Reports without files</remarks>
        /// <returns>SeminarReportViewDto array</returns>        
        [HttpGet, Route("")]
        [SuppressMessage("ReSharper", "SuggestVarOrType_Elsewhere")]
        public HttpResponseMessage GetViewDtos()
        {
            IEnumerable<SeminarReportViewDto> seminarReportViewDtos = seminarReportService.GetViewDtos(User.Identity.Name);        
            
            return Request.CreateResponse(HttpStatusCode.OK, seminarReportViewDtos);                        
        }

        /// <summary>
        /// Get report Получение одного отчета для отображения вместе с файлами
        /// </summary>        
        /// <returns>Reports with files</returns>        
        [HttpGet, Route("{id:int}")]        
        public IHttpActionResult GetEditDto()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());

            SeminarReportEditDto reseminarReportEditDto = null;
            try
            {
                reseminarReportEditDto = seminarReportService.GetEditDto(reportId, User.Identity.Name);
            }
            catch (FileNotFoundException)
            {
                ModelState.AddModelError("fileNotFound", "One of reportjlby  file was not found");
                Request.CreateErrorResponse(HttpStatusCode.NotFound, ModelState);
            }

            return Ok(reseminarReportEditDto);
        }                                               

        /// <summary>
        /// Delete report
        /// </summary>
        /// <returns></returns>        
        [HttpDelete, Route("{id:int}")]
        [Authorize(Roles = "school")]
        public IHttpActionResult DeleteReport()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());            
            var schoolId = User.Identity.Name;
            try
            {
                seminarReportService.DeleteReport(reportId, schoolId);
            }
            catch(ArgumentException)
            {                
                ModelState.AddModelError("file", "fileId указан не верно или у пользователя отсутствуют права на удаление");
                return BadRequest(ModelState);
            }
            
            return Ok();
        }

        /// <summary>
        /// Create seminar report by files
        /// </summary>
        /// <returns></returns>
        [HttpPost, Route("")]
        [Authorize(Roles = "school")]
        [SuppressMessage("ReSharper", "SuggestVarOrType_SimpleTypes")]
        // TODO: refactring
        public HttpResponseMessage CreateReport()
        {
            var schoolId = User.Identity.Name;
            HttpFileCollection httpFileCollection = HttpContext.Current.Request.Files;

            // Generate Dictionary<string, UniqueStream>
            var first5Keys = httpFileCollection.AllKeys.Take(5); // must have 1 protocol and max 4 fotos                                                     
            var uniqueStreamDictionary = first5Keys.ToDictionary(key => key, key => new UniqueStream
            {
                FileName = httpFileCollection[key].FileName,
                Stream = httpFileCollection[key].InputStream
            });

            // Call service
            var serviceResult = seminarReportService.CreateReport(uniqueStreamDictionary, schoolId);
            // Success
            if (!serviceResult.Errors.Any())
                return Request.CreateResponse(HttpStatusCode.Created, serviceResult.Result);
            // Error
            foreach (var error in serviceResult.Errors)
                ModelState.AddModelError(error.Key, error.Description);            
            return Request.CreateErrorResponse(serviceResult.Errors.Any(e => e.HttpCode == 409) ? HttpStatusCode.Conflict : HttpStatusCode.BadRequest, ModelState);            
        }

        #endregion
    }
}