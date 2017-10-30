﻿using System;
using System.Collections.Generic;
using System.Web.Http;
using Monit95App.Services.Rsur.ParticipReport;

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

        [HttpGet]
        [Route("{rsurParticipTestId:int}")]
        public IHttpActionResult Get()
        {
            var rsurParticipTestId = int.Parse(RequestContext.RouteData.Values["rsurParticipTestId"].ToString());
            var report = participReportService.GetReport(rsurParticipTestId);

            return Ok(report);
        }

        [HttpGet]   
        [Route("")]
        public IHttpActionResult Get(string testDate)
        {
            if (!DateTime.TryParse(testDate, out DateTime testDateObj)) return BadRequest("Cannot parse testDate string to DateTime object");

            IEnumerable<ParticipReport> rsurResults = null;
            if (User.IsInRole("area"))
            {
                var areaCode = int.Parse(User.Identity.Name);
                try
                {
                    rsurResults = participReportService.GetResultsForArea(areaCode, testDateObj);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else if(User.IsInRole("school"))
            {
                var schoolId = User.Identity.Name;
                try
                {
                    rsurResults = participReportService.GetResultsForSchool(schoolId, testDateObj);
                }
                catch (ArgumentException ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            return Ok(rsurResults);
        }

        #endregion
    }
}
