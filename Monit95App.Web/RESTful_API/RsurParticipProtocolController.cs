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
    public class RsurParticipProtocolController : ApiController
    {
        #region Dependencies

        private readonly IRsurParticipProtocolService rsurParticipProtocolService;

        #endregion

        public RsurParticipProtocolController(IRsurParticipProtocolService rsurParticipProtocolService)
        {
            this.rsurParticipProtocolService = rsurParticipProtocolService;
        }

        #region APIs        
        
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetProtocols(int rsurTestId)
        {
            var areaCode = int.Parse(User.Identity.Name);            

            IEnumerable<RsurParticipShowProtocol> protocols;
            try
            {
                protocols = rsurParticipProtocolService.GetProtocols(rsurTestId, areaCode);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(protocols);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetProtocol()
        {            
            var rsurParticipTestId = int.Parse(RequestContext.RouteData.Values["id"].ToString());

            RsurParticipEditProtocol protocol;
            try
            {
                protocol = rsurParticipProtocolService.GetProtocol(rsurParticipTestId);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            var areaCode = int.Parse(User.Identity.Name);
            if(protocol.AreaCode != areaCode)
            {
                return BadRequest("Resource is not access current user");
            }

            return Ok(protocol);
        }


        //var result = _participTestRepository.GetAll().Where(x => x.Id == participTestId).ToList().Select(s => new RsurGetMarksDto
        //{
        //    ParticipTestId = s.Id,
        //    Code = s.RsurParticip.Code,
        //    TestNumberCodeWithName = s.RsurTest.Test.NumberCode + " — " + s.RsurTest.Test.Name.Trim(),
        //    MarkNames = GetMarkNamesByTestId(s.RsurTestId),
        //    Marks = s.RsurTestResult == null ? null : s.RsurTestResult.RsurQuestionValues
        //});

        //    return result.SingleOrDefault();

        // Get particular particip protocol
        // TODO: set rsurParticipTestId as 5 chatachters number
        [HttpGet]
        [Route("{id:int}/protocols/{rsurParticipTestId:int}")]
        public IHttpActionResult GetParticipProtocol()
        {            
            var rsurTestId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);
            var rsurParticipTestId = Convert.ToInt32(RequestContext.RouteData.Values["id"]);

            IEnumerable<RsurParticipShowProtocol> protocols;
            try
            {
                protocols = rsurTestService.GetProtocols(rsurTestId, areaCode);
            }
            catch (ArgumentException ex)
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
