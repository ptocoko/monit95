using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize]
    public class AccountApiController : ApiController
    {
        //Get current user's name
        public string GetUserName()
        {
            return User.Identity.Name;
        }
    }
}
