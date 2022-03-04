using System.Web.Http;
using Microsoft.AspNet.Identity;
using Monit95App.Services.Interfaces;

namespace Monit95App.RESTful_API.Rsur
{
    /// <summary>
    /// Контроллер по работе с рейтингами
    /// </summary>    
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
            if (areaCode == 206)
            {
                return BadRequest("Для аккаунта 206 рейтинги не доступны");
            }
            var ratings = ratingService.CreateRatings(areaCode);

            return Ok(ratings);
        }

        #endregion
    }
}
