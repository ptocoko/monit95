﻿using System;
using System.Collections.Generic;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Monit95App.Services.DTOs;
using Monit95App.Services.Rsur;
using Monit95App.Services.Rsur.Protocol;
using Monit95App.Services.Rsur.ParticipReport;

namespace Monit95App.RESTful_API
{
    [Authorize(Roles = "area")]
    [RoutePrefix("api/rsur/testProtocols")]
    public class RsurTestResultsController : ApiController
    {
        #region Dependencies

        private readonly IProtocolService testProtocolService;
        private readonly IParticipReportService participReportService;
        #endregion

        public RsurTestResultsController(IProtocolService testProtocolService, IParticipReportService participReportService)
        {
            this.testProtocolService = testProtocolService;
            this.participReportService = participReportService;
        }

        #region APIs        

        //[HttpGet]
        //[Route("")]
        //public IHttpActionResult GetResults(int rsurTestId)
        //{
        //    var areaCode = int.Parse(User.Identity.Name);

        //    IEnumerable<RsurTestResultDto> rsurTestResultDtos;
        //    try
        //    {
        //        rsurTestResultDtos = rsurTestResultService.GetResults(rsurTestId, areaCode);
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        //    return Ok(); //
        //}

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

        [HttpGet]
        [Authorize(Roles = "area")]
        [Route("~/api/rsurTestResults")]
        public IHttpActionResult GetResultsByTestDate(string testDate)
        {
            var areaCode = int.Parse(User.Identity.Name);
            if (!DateTime.TryParse(testDate, out DateTime testDateObj)) return BadRequest("Cannot parse testDate string to DateTime object");

            IEnumerable<ParticipReport> rsurResults;
            try
            {
                rsurResults = participReportService.GetResultsByTestDate(areaCode, testDateObj);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(rsurResults);
        }

        //TODO: need refactoring
        [HttpGet]
        [Route("~/api/RsurTests/Statistics")]
        public IHttpActionResult GetStatistics(int rsurTestId)
        {
            var userName = User.Identity.GetUserName();
            var areaCode = Convert.ToInt32(userName);
            return Ok(testProtocolService.GetStatistics(areaCode));
        }

        //TODO: need refactoring
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