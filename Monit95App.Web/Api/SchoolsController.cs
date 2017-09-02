using System.Web.Http;

using Monit95App.Services.Interfaces;
using Monit95App.Services.School;
using Monit95App.Web.Services;

// ReSharper disable CheckNamespace
namespace Monit95App.Web.Api
{    
    [Authorize(Roles = "coko, school")]
    [RoutePrefix("api/schools")]
    public class SchoolsController : ApiController
    {
        #region Dependencies

        private readonly ISchoolService _schoolService;
        private readonly IUserService _userService;

        #endregion

        public SchoolsController(ISchoolService schoolService, IUserService userService)
        {
            _schoolService = schoolService;
            _userService = userService;
        }

        #region APIs

        [HttpPut]
        [Route("{id:length(4)}")]
        public IHttpActionResult Put([FromBody] SchoolModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(model);
        }

        #endregion     
    }
}
