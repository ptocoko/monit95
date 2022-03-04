using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Monit95App.Services.Rsur.SeminarReport;

namespace Monit95.WebApp.RESTful_API.Rsur
{
    [RoutePrefix("api/rsur/seminarReports")]
    [Authorize(Roles = "coko, area, school")]    
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
        public HttpResponseMessage GetViewDtos()
        {
            var userName = User.Identity.Name;
            if (User.IsInRole("coko") && User.IsInRole("area"))                            
                userName = userName.Substring(0, 3); // e.g. "201coko"->"201"

            IEnumerable<SeminarReportViewDto> seminarReportViewDtos = seminarReportService.GetViewDtos(userName);        
            
            return Request.CreateResponse(HttpStatusCode.OK, seminarReportViewDtos);                        
        }

        /// <summary>
        /// Получение одного отчета для отображения вместе с файлами
        /// </summary>        
        /// <returns>Reports with files</returns>        
        [HttpGet, Route("{id:int}")]        
        public IHttpActionResult GetEditDto()
        {
            var userName = User.Identity.Name;
            if (User.IsInRole("coko") && User.IsInRole("area"))
                userName = userName.Substring(0, 3); // e.g. "201coko"->"201"

            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());

            SeminarReportEditDto reseminarReportEditDto = null;
            try
            {
                reseminarReportEditDto = seminarReportService.GetEditDto(reportId, userName);
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
        /// TODO: refa
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

        [HttpPost, Route("")]
        [Authorize(Roles = "school")] 
        // TODO: refactring
        public HttpResponseMessage CreateReport()
        {
            var schoolId = User.Identity.Name;
            HttpFileCollection httpFileCollection = HttpContext.Current.Request.Files;

            httpFileCollection.Cast<HttpPostedFile>().Where(hpf => hpf != null && hpf.InputStream != null).Take(5);
            // ReSharper disable once PossibleNullReferenceException
            // Generate Dictionary<string, Stream>
            var first5Keys = httpFileCollection.AllKeys.Take(5); // must have 1 protocol and max 4 fotos                                                     
            var uniqueStreamDictionary = new Dictionary<string, UniqueStream>();

            foreach(var key in first5Keys)
            {
                uniqueStreamDictionary.Add(key, new UniqueStream
                {
                    FileName = httpFileCollection[key].FileName,
                    Stream = httpFileCollection[key].InputStream
                });
            }

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