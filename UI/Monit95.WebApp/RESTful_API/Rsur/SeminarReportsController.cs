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
    //[Authorize(Roles = "area, school")]    
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
        /// Получить список отчетов для пользователя
        /// </summary>
        /// <returns>SeminarReportViewDto[]</returns>        
        [HttpGet, Route("")]
        public HttpResponseMessage GetViewDtos()
        {
            var seminarReportViewDtos = seminarReportService.GetViewDtos(User.Identity.Name);        
            
            return Request.CreateResponse(HttpStatusCode.OK, seminarReportViewDtos);                        
        }

        /// <summary>
        /// Получение одного отчета для отображения
        /// </summary>        
        /// <returns></returns>        
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
                ModelState.AddModelError("fileNotFound", "One of seminar file is not found");
                Request.CreateErrorResponse(HttpStatusCode.NotFound, ModelState);
            }

            return Ok(reseminarReportEditDto);
        }                                               

        /// <summary>
        /// Удаление отчета
        /// </summary>
        /// <returns></returns>
        [HttpDelete, Route("{id:int}")]
        [Authorize(Roles = "school")]
        public IHttpActionResult DeleteReport()
        {
            var reportId = int.Parse(RequestContext.RouteData.Values["id"].ToString());
            
            var schoolId = User.Identity.Name;

            seminarReportService.DeleteReport(reportId, schoolId);

            return Ok();
        }

        [HttpPost, Route("")]
        [Authorize(Roles = "school")] 
        // TODO: refactring
        public HttpResponseMessage CreateReport()
        {
            var schoolId = User.Identity.Name;
            HttpFileCollection httpFileCollection = HttpContext.Current.Request.Files;
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

/// <summary>
/// Создание отчета
/// </summary>
/// <remarks>Отчет создается, отправкой файла протокола проведения заседания ШМО</remarks>
/// <returns>RsurReports.Id</returns>
//[HttpPost, Route("")]
//[Authorize(Roles = "school")]
//[SuppressMessage("ReSharper", "SuggestVarOrType_SimpleTypes")]
//public HttpResponseMessage CreateReport()
//{
//var schoolId = User.Identity.Name;

//// Find file in requestBody
//var httpFileCollection = HttpContext.Current.Request.Files;
//    if (httpFileCollection.Count == 0)
//return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "To create report need protocol file. Request body has not any file");

//// Get file's content from body            
//var httpPostedFile = httpFileCollection.Get(0);

//// Call service
//var result = seminarReportService.CreateReport(httpPostedFile.InputStream, httpPostedFile.FileName, schoolId);

//    // Success
//    if (!result.Errors.Any())
//return Request.CreateResponse(HttpStatusCode.Created, result.Result);

//// Error: dublicate
//if (result.Errors.Any(error => error.HttpCode == 409))
//return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Такой протокол уже зарегистрирован в системе");

//// Error: another
//foreach (var error in result.Errors)
//ModelState.AddModelError(error.HttpCode.ToString(), error.Description);

//return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
//}

//// Get protocol file
//var protocolFile = httpFileCollection["protocol"];
//if (protocolFile == null)
//    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "File collection has not file with key «protocol»");

//var streamDictionary = new Dictionary<string, Stream>
//{
//    { "protocol", protocolFile.InputStream }
//};

//// Get foto files
//var fotoFileKeys = httpFileCollection.AllKeys.Where(k => k.StartsWith("foto"))
//                                     .Take(4) // max 4 fotos
//                                     .Distinct() // delete dublicate keys                                  
//                                     .ToList(); 
//if (fotoFileKeys.Count < 2) // min 2 fotos            
//    return Request.CreateErrorResponse(HttpStatusCode.NotFound, $"File collection has to has 2-4 foto files. Now is {fotoFileKeys.Count}");

//foreach (var key in fotoFileKeys)
//{
//    // ReSharper disable once PossibleNullReferenceException
//    streamDictionary.Add(key, httpFileCollection[key].InputStream);
//}      