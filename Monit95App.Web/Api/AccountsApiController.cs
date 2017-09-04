using System.Web.Http;

using Microsoft.AspNet.Identity;

using Monit95App.Web.Services;

// ReSharper disable CheckNamespace
namespace Monit95App.Web.Api
{    
    [Authorize]
    [RoutePrefix("api/account")]
    public class AccountsApiController : ApiController
    {
        #region Dependencies

        private readonly IAccountService accountService;

        //private readonly ApplicationDbContext _dbContext = new ApplicationDbContext();

        #endregion

        public AccountsApiController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        #region Api

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var model = this.accountService.GetModel(User.Identity.GetUserId());

            return this.Ok(model);
        }

        //[HttpGet]
        //public HttpResponseMessage Get()
        //{
        //    #warning here i try fix
        //    var user = _dbContext.Users.Find(User.Identity.GetUserId());

        //    if (user.Roles.Count > 0)
        //    {
        //        var userRoles = user.Roles.Select(x => _dbContext.Roles.First(s => s.Id == x.RoleId).Name);
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
