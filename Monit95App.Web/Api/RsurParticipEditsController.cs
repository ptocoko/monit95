using Monit95App.Services.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Monit95App.Services.Interfaces;

namespace Monit95App.Api
{
    [Authorize(Roles = "coko")]
    [RoutePrefix("api/RsurParticipEdits")]
    public class RsurParticipEditsController : ApiController
    {
        private readonly IRsurParticipEditService _rsurParticipEditService;

        public RsurParticipEditsController(IRsurParticipEditService particiEditService)
        {
            _rsurParticipEditService = particiEditService;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            var edits = _rsurParticipEditService.GetAll();

            return Ok(edits);
        }

        [HttpDelete]
        [Route(@"{ParticipCode:regex(^2016-2\d{2}-\d{3})}")]
        public IHttpActionResult Delete() //Aplly edit 
        {
            var participCode = RequestContext.RouteData.Values["ParticipCode"].ToString();

            try
            {
                _rsurParticipEditService.Apply(participCode);
            }
            catch(ArgumentException)
            {
                return NotFound();
            }
            
            return Ok();
        }
    }
}
