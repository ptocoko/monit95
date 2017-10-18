using System;
using System.Collections.Generic;
using System.Web.Http;

namespace Monit95App.Api
{
    using Microsoft.AspNet.Identity;
    using Monit95App.Services.DTOs;
    using Monit95App.Services.Interfaces;

    [Authorize(Roles = "area")]
    [RoutePrefix("api/rsurTests")]
    public class RsurTestsController : ApiController
    {
        #region Dependencies

        private readonly IRsurTestService rsurTestService;

        #endregion

        public RsurTestsController(IRsurTestService rsurTestService)
        {
            this.rsurTestService = rsurTestService;
        }

        #region APIs        
        
        [HttpGet]
        [Route("{id}/protocols")]
        public IHttpActionResult GetProtocols()
        {
            var areaCode = int.Parse(User.Identity.Name);
            var rsurTestId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);

            IEnumerable<RsurTestProtocol> protocols;
            try
            {
                protocols = rsurTestService.GetProtocols(rsurTestId, areaCode);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(protocols);
        }

        //TODO: need refactoring
        [HttpGet]
        [Route("~/api/RsurTests/Statistics")]
        public IHttpActionResult GetStatistics()
        {
            var userName = User.Identity.GetUserName();
            var areaCode = Convert.ToInt32(userName);
            return Ok(rsurTestService.GetStatistics2(areaCode));
        }

        //TODO: need refactoring
        [HttpGet]
        [Route("~/api/RsurTests/{rsurTestId:int}/Name")]
        public IHttpActionResult GetTestName()
        {
            var rsurTestId = Convert.ToInt32(RequestContext.RouteData.Values["rsurTestId"]);

            return Ok(rsurTestService.GetTestName(rsurTestId));
        }
        #endregion
    }
}
