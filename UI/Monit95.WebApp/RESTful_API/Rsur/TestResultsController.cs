using System.Web.Http;

using Monit95App.Services.DTOs;

namespace Monit95App.RESTful_API.Rsur
{
    using System.Linq;
    using System.Net;
    using System.Net.Http;

    using Services.Rsur.RsurTestResultService;

    /// <summary>
    /// Контроллер по работа с протоколами проверки заданий участника
    /// </summary>
    [Authorize(Roles = "area")]
    [RoutePrefix("api/rsur/marksProtocols")]
    public class TestResultsController : ApiController
    {
        private readonly IRsurTestResultService rsurTestResultService;        

        public TestResultsController(IRsurTestResultService rsurTestResultService)
        {
            this.rsurTestResultService = rsurTestResultService;            
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post([FromBody]RsurTestResultDto rsurTestResultDto)
        {                       
            var areaCode = int.Parse(User.Identity.Name);
            var result = rsurTestResultService.CreateOrUpdate(rsurTestResultDto, areaCode);

            if (!result.Errors.Any())
            {
                return Request.CreateResponse(HttpStatusCode.Created);
            }

            foreach (var error in result.Errors)
            {
                this.ModelState.AddModelError(error.HttpCode, error.Description);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);
        }

        //[HttpGet]        
        //[Route("{participTestId:int}")]
        //public IHttpActionResult GetOld()
        //{            
        //    var participTestId = Convert.ToInt32(RequestContext.RouteData.Values["participTestId"]);
        //    var result = rsurMarksProtocolService.GetByParticipTestId(participTestId);

        //    if(result != null)
        //    {
        //        return Ok(result);
        //    }
        //    return NotFound();
        //}        

        [HttpPut]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Put([FromBody]RsurPutMarksDto marksDto)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //var rsurParticipTestId = Convert.ToInt32(RequestContext.RouteData.Values["rsurParticipTestId"]);

            //var isTestOpen = _context.RsurParticipTests.Single(x => x.Id == rsurParticipTestId).RsurTest.IsOpen; //аналогично методу POST
            //if (!isTestOpen) return Conflict();

            //var rsurParticipArea = _context.RsurParticipTests.Single(x => x.Id == rsurParticipTestId).RsurParticip.School.AreaCode;
            //if (User.Identity.Name != rsurParticipArea.ToString()) return Conflict();

            //marksProtocolService.AddOrUpdateMarks(rsurParticipTestId, marksDto.Marks);

            return Ok();
        }

        /// <summary>
        /// Получает протокол проверки заданий участника. Поиск идет среди текущих отрытых тестов
        /// </summary>
        /// <returns>
        /// The <see cref="IHttpActionResult"/>.
        /// </returns>
        [HttpGet]
        [Route("{participCode:range(10000, 99999)}")]
        public IHttpActionResult Get()
        {
            var participCode = int.Parse(RequestContext.RouteData.Values["participCode"].ToString());
            var areaCode = int.Parse(User.Identity.Name);

            RsurTestResultDto marksProtocol;
            try
            {
                marksProtocol = this.rsurTestResultService.Get(participCode, areaCode);
            }
            catch (System.ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(marksProtocol);
        }
    }
}

