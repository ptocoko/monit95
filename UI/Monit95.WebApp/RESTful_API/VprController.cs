using Monit95App.Domain.Core.Entities;
using Monit95App.Services.VprSchools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API
{
    [Authorize(Roles = "school, coko-director")]
    public class VprController : ApiController
    {
        private readonly VprSchoolsService vprService;

        public VprController(VprSchoolsService vprService)
        {
            this.vprService = vprService;
        }

        [Route("api/vpr")]
        [HttpGet]
        public IHttpActionResult Get([FromUri] string classNumber, [FromUri] string subjectCode)
        {
            if (string.IsNullOrEmpty(classNumber) || string.IsNullOrEmpty(subjectCode))
            {
                return BadRequest("Не указаны обязательные параметры");
            }

            var schoolId = User.Identity.Name;
            return Ok(vprService.GetSchoolMarks(schoolId: schoolId, classNumber: classNumber, subjectCode: subjectCode));
        }

        [Route("api/vpr")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] VprWeekSchool weekSchool)
        {
            weekSchool.SchoolId = User.Identity.Name;
            vprService.SaveSchoolMarks(weekSchool);
            return Ok();
        }

        [Authorize(Roles = "coko-director")]
        [Route("api/vpr/statistics")]
        [HttpGet]
        public IHttpActionResult GetStats([FromUri] string classNumber, [FromUri] string subjectCode, [FromUri] string schoolId)
        {
            //var schoolId = User.Identity.Name;
            return Ok(vprService.GetStatisticsForSubject(schoolId: schoolId, classNumber: classNumber, subjectCode: subjectCode));
        }

        [Authorize(Roles = "coko-director")]
        [Route("api/vpr/classes")]
        [HttpGet]
        public IHttpActionResult GetClasses()
        {
            return Ok(vprService.GetClasses());
        }

        [Authorize(Roles = "coko-director")]
        [Route("api/vpr/subjects")]
        [HttpGet]
        public IHttpActionResult GetSubjects([FromUri] string classNumber)
        {
            return Ok(vprService.GetSubjects(classNumber));
        }

        [Authorize(Roles = "coko-director")]
        [Route("api/vpr/areas")]
        [HttpGet]
        public IHttpActionResult GetAreas([FromUri] string classNumber, [FromUri] string subjectCode)
        {
            return Ok(vprService.GetAreas(classNumber, subjectCode));
        }

        [Authorize(Roles = "coko-director")]
        [Route("api/vpr/schools")]
        [HttpGet]
        public IHttpActionResult GetSchools([FromUri] string classNumber, [FromUri] string subjectCode, [FromUri] int areaCode)
        {
            return Ok(vprService.GetSchools(classNumber, subjectCode, areaCode));
        }
    }
}