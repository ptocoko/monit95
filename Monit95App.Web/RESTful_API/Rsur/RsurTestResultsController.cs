using System;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Monit95App.Services.DTOs;
using Monit95App.Services.Rsur.MarksProtocol;

namespace Monit95App.RESTful_API.Rsur
{
    [Authorize(Roles = "area")]
    [RoutePrefix("api/rsur/testProtocols")]
    public class RsurTestResultsController : ApiController
    {
        #region Dependencies

        private readonly IMarksProtocolService testProtocolService;
        
        #endregion

        public RsurTestResultsController(IMarksProtocolService testProtocolService)
        {
            this.testProtocolService = testProtocolService;            
        }

        #region APIs              

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetProtocol()
        {
            var rsurParticipTestId = int.Parse(RequestContext.RouteData.Values["id"].ToString());

            RsurParticipEditProtocol protocol;
            try
            {
                protocol = testProtocolService.GetProtocol(rsurParticipTestId);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            var areaCode = int.Parse(User.Identity.Name);
            if (protocol.AreaCode != areaCode)
            {
                return BadRequest("Resource is not access current user");
            }

            return Ok(protocol);
        }        

        // TODO: need refactoring
        [HttpGet]
        [Route("~/api/RsurTests/Statistics")]
        public IHttpActionResult GetStatistics(int rsurTestId)
        {
            var userName = User.Identity.GetUserName();
            var areaCode = Convert.ToInt32(userName);
            return Ok(testProtocolService.GetStatistics(areaCode));
        }

        // TODO: need refactoring
        [HttpGet]
        [Route("~/api/RsurTests/{rsurTestId:int}/Name")]
        public IHttpActionResult GetTestName()
        {
            var rsurTestId = Convert.ToInt32(RequestContext.RouteData.Values["rsurTestId"]);

            return Ok(testProtocolService.GetTestName(rsurTestId));
        }
        #endregion
    }
}
