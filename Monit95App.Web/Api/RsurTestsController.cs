using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    using Microsoft.AspNet.Identity;

    using Monit95App.Services.Interfaces;

    [Authorize(Roles = "coko, area")]
    [RoutePrefix("api/RsurTests")]
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
        [Route("~/api/RsurTests/{id:int}/Statistics")]        
        public IHttpActionResult GetStatistics()
        {
            var userName = User.Identity.GetUserName();
            var rsurTestId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            int? areaCode = null;

            if (User.IsInRole("area"))
            {
                areaCode = Convert.ToInt32(userName);
            }

            var dto = rsurTestService.GetStatistics(rsurTestId, areaCode);

            return this.Ok(dto);
        }

        #endregion
    }
}
