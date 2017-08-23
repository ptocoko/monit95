using Monit95App.Services.Models.Rsur;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Monit95App.Services.Interfaces;

namespace Monit95App.Web.Api
{
    [Authorize(Roles = "coko")]
    [RoutePrefix("api/RsurParticipEdits")]
    public class RsurParticipEditsController : ApiController
    {
        #region Dependencies

        private readonly IRsurParticipEditService _rsurParticipEditService;

        #endregion

        public RsurParticipEditsController(IRsurParticipEditService particiEditService)
        {
            _rsurParticipEditService = particiEditService;
        }

        #region Api

        [HttpGet]
        public IHttpActionResult Get()
        {
            var edits = _rsurParticipEditService.GetAll();

            return Ok(edits);
        }

        [HttpDelete]
        [Route(@"{ParticipCode:regex(^2016-2\d{2}-\d{3})}")]
        public IHttpActionResult Delete() //Apply edit 
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

        #endregion
    }
}
