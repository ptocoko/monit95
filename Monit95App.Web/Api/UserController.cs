using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize]
    public class UserController : ApiController
    {
        //Get current user' name
        public string GetName()
        {
            return User.Identity.Name;
        }
    }
}
