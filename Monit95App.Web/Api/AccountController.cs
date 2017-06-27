using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize]
    public class AccountController : ApiController
    {
        //Get current user's name
        public object GetUserNameAndRole()
        {
            var isAreaRole = User.IsInRole("area");
            return new { UserName = User.Identity.Name, IsAreaRole = isAreaRole };
        }
    }
}
