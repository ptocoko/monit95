using Monit95App.Domain.Core;
using Monit95App.Services.Interfaces;
using Monit95App.Services.School;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize(Roles = "coko, school")]
    [RoutePrefix("api/SchoolEdits")]
    public class SchoolEditsController : ApiController
    {
        #region Fields

        private readonly ISchoolEditService _schoolEditService;

        #endregion

        public SchoolEditsController(ISchoolEditService schoolEditService)
        {
            _schoolEditService = schoolEditService;
        }

        #region Api

        [Authorize(Roles = "coko")]
        [Route("{id}")]
        [HttpDelete]
        public HttpResponseMessage Delete()
        {
            var id = RequestContext.RouteData.Values["id"].ToString();

            var wasDeleted = _schoolEditService.DeleteEditTask(id);

            return wasDeleted ? Request.CreateResponse(HttpStatusCode.OK) :
                                Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Cannot delete correction");
        }

        [HttpPost]
        public HttpResponseMessage Post(SchoolEdit entity)
        {
            if (entity?.Id == null || entity.Name == null)
            {
                throw new ArgumentException(nameof(entity));
            }

            _schoolEditService.AddEditTask(entity);

            return Request.CreateResponse(HttpStatusCode.Created);
        }       

        #endregion
    }
}