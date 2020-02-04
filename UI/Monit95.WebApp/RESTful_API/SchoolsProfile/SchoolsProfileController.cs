using Monit95App.Services.SchoolsProfile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API.SchoolsProfile
{
    //[Authorize(Roles = "school")]
    [RoutePrefix("api/schools-profile")]
    public class SchoolsProfileController : ApiController
    {
        private readonly SchoolsProfileService profileService;

        public SchoolsProfileController(SchoolsProfileService profileService)
        {
            this.profileService = profileService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetQuestions()
        {
            var schoolId = User.Identity.Name;
            var res = profileService.GetProfileQuestions("0005");
            return Ok(res);
        }
    }
}