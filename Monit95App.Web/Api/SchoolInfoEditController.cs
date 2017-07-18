using Monit95App.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize(Roles = "school,coko")]
    public class SchoolInfoEditController : ApiController
    {
        private ISchoolInfoEditService _schoolInfoEditService;
        public SchoolInfoEditController(ISchoolInfoEditService schoolInfoEditService)
        {
            _schoolInfoEditService = schoolInfoEditService;
        }

        [HttpDelete]
        [Authorize(Roles = "coko")]
        public async Task<HttpResponseMessage> DeleteNameCorrection(string schoolId)
        {
            if (String.IsNullOrEmpty(schoolId))
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Wrong request");

            var isUpdated = await Task.Run(() => _schoolInfoEditService.DeleteNameCorrection(schoolId));
            if (isUpdated)
                return Request.CreateResponse(HttpStatusCode.OK);
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Cannot delete correction");
        }

        [HttpPut]
        public async Task<HttpResponseMessage> AddNameCorrection(string name)
        {
            if (String.IsNullOrEmpty(name))
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса 'update name'");

            var schoolId = User.Identity.Name;

            var isUpdated = await Task.Run(() => _schoolInfoEditService.AddNameCorrection(name, schoolId));
            if (isUpdated)
                return Request.CreateResponse(HttpStatusCode.Created);
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось обновить наименование");
        }

        [HttpPut]
        [Authorize(Roles = "coko")]
        public async Task<HttpResponseMessage> UpdateName(string name, string schoolId)
        {
            if (String.IsNullOrEmpty(name) || schoolId == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса 'update name'");

            var isUpdated = await Task.Run(() => _schoolInfoEditService.UpdateField(school => school.Name = name, schoolId));
            if (isUpdated)
                return Request.CreateResponse(HttpStatusCode.Created);
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось обновить наименование");
        }

        [HttpPut]
        public async Task<HttpResponseMessage> UpdatePhone(string phone)
        {
            if (phone == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");

            var schoolId = User.Identity.Name;

            var isUpdated = await Task.Run(() => _schoolInfoEditService.UpdateField(school => school.Phone = phone, schoolId));
            if (isUpdated)
                return Request.CreateResponse(HttpStatusCode.Created);
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось обновить номер телефона");
        }

        [HttpPut]
        public async Task<HttpResponseMessage> UpdateEmail(string email)
        {
            if (email == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");

            var schoolId = User.Identity.Name;

            var isUpdated = await Task.Run(() => _schoolInfoEditService.UpdateField(school => school.Email = email, schoolId));
            if (isUpdated)
                return Request.CreateResponse(HttpStatusCode.Created);
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось обновить email");
        }
    }
}