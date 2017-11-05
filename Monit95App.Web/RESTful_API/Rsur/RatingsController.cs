using System.Web.Http;
using Microsoft.AspNet.Identity;
using Monit95App.Services.Interfaces;

namespace Monit95App.RESTful_API.Rsur
{
    [Authorize(Roles = "area")]
    [RoutePrefix("api/rsur/ratings")]
    public class RatingsController : ApiController
    {
        #region Dependencies

        private readonly IRatingService ratingService;

        #endregion

        public RatingsController(IRatingService ratingService)
        {
            this.ratingService = ratingService;
        }

        #region APIs

        [Route("")]
        public IHttpActionResult Get()
        {
            var areaCode = int.Parse(User.Identity.GetUserName());
            var ratings = ratingService.CreateRatings(areaCode);

            return Ok(ratings);
        }

        #endregion
    }
}
