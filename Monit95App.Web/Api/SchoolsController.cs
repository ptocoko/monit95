using System;
using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using System.Collections;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.AspNet.Identity;
using Monit95App.Services.Interfaces;
using Monit95App.Web.Services;
using Monit95App.Services.School;

namespace Monit95App.Api
{
    //[Authorize(Roles = "coko, school")]
    [RoutePrefix("api/schools")]
    public class SchoolsController : ApiController
    {
        #region Fields

        private readonly ISchoolService _schoolService;
        private readonly IUserService _userService;

        #endregion

        #region Api

        [HttpPut]
        [Route("{id:length(4)}")]
        public async Task<IHttpActionResult> PutAsync([FromBody] SchoolModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(model);
        }

        #endregion

        public SchoolsController(ISchoolService schoolService, IUserService userService)
        {
            _schoolService = schoolService;
            _userService = userService;
        }      
    }
}
