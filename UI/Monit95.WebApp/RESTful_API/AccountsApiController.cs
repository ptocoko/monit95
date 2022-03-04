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

        #endregion

        public AccountsApiController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        #region APIs

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var model = this.accountService.GetModel(User.Identity.GetUserId());

            return this.Ok(model);
        }       

        #endregion
    }
}
