using Microsoft.AspNet.Identity;
using Monit95App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using Monit95App.Web.Services;

namespace Monit95App.Api
{
    [Authorize]
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        #region Fields

        //private readonly ApplicationDbContext _dbContext = new ApplicationDbContext();
        private readonly IUserService _userService;

        #endregion

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        #region Api

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var userModel = _userService.GetModel(User.Identity.GetUserId());

            return Ok(userModel);
        }

        //[Route("api/accounts")]
        //[HttpGet]
        //public HttpResponseMessage Get()
        //{            
        //    var user = _dbContext.Users.Find(User.Identity.GetUserId());
        //    if(user.Roles.Count > 0)
        //    {
        //        var userRoles = user.Roles.Select(x => x.Role.Name);
        //        var model = new UserModel
        //        {
        //            UserName = User.Identity.Name,
        //            UserRoleNames = userRoles
        //        };
        //        return Request.CreateResponse(HttpStatusCode.OK, model);
        //    }
        //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "The user has no one role");            
        //}

        #endregion
    }
}
