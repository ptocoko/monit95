using Monit95App.Domain.Core;
using Monit95App.Infrastructure.Data;
using System.Collections;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Monit95App.Web.Services;
using Monit95App.Services.School;

namespace Monit95App.Api
{
    [Authorize]
    [RoutePrefix("api/schools")]
    public class SchoolsController : ApiController
    {
        #region Fields

        private readonly ISchoolService _schoolService;
        private readonly IUserService _userService;

        #endregion

        #region Api

        [HttpPut]
        [Route("{id}")]
        public async Task<HttpResponseMessage> Put([FromBody] SchoolModel model)
        {            

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        #endregion


        public SchoolsController(ISchoolService schoolService, IUserService userService)
        {
            _schoolService = schoolService;
            _userService = userService;
        }

        public SchoolsController()
        {

        }        
    }
}
