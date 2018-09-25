using Monit95App.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95.WebApp.RESTful_API
{
    [Authorize(Roles = "school")]
    [RoutePrefix("api/cards")]
    public class CardsController : ApiController
    {
        private readonly CardsGenerator cardsGenerator;

        public CardsController(CardsGenerator cardsGenerator)
        {
            this.cardsGenerator = cardsGenerator;
        }

        [HttpGet]
        [Route("{projectTestId:int}")]
        public async Task<HttpResponseMessage> GetCardsArchieve([FromUri] int projectTestId)
        {
            var path = await cardsGenerator.GetCardsArchievePathAsync(User.Identity.Name, projectTestId);
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new FileStream(path, FileMode.Open, FileAccess.Read);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

            return result;
        }
    }
}