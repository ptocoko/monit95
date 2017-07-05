using Microsoft.AspNet.Identity;
using Monit95App.Models;
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
        #region Fields

        private readonly ApplicationDbContext _dbContext = new ApplicationDbContext();

        #endregion

        #region Api

        [Route("api/accounts")]
        [HttpGet]
        public HttpResponseMessage Get()
        {            
            var user = _dbContext.Users.Find(User.Identity.GetUserId());
            if(user.Roles.Count > 0)
            {
                var userRoles = user.Roles.Select(x => x.Role.Name);
                var model = new ApiViewModel
                {
                    UserName = User.Identity.Name,
                    UserRoleNames = userRoles
                };
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
            return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "The user has no one role");            
        }


        //Get current user's name
        public object GetUserNameAndRole()
        {
            var isAreaRole = User.IsInRole("area");
            return new { UserName = User.Identity.Name, IsAreaRole = isAreaRole };
        }

        #endregion
    }
}
