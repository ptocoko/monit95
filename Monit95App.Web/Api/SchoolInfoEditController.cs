using Monit95App.Infrastructure.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monit95App.Api
{
    [Authorize(Roles = "school")]
    public class SchoolInfoEditController : ApiController
    {
        private ISchoolInfoEditService _schoolInfoEditService;
        public SchoolInfoEditController(ISchoolInfoEditService schoolInfoEditService)
        {
            _schoolInfoEditService = schoolInfoEditService;
        }

        [HttpPut]
        public async Task<HttpResponseMessage> UpdateName(string name, string schoolId)
        {
            //if (name == null || schoolId == null)
            //    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса 'update name'");

            //var isUpdated = await Task.Run(() => _schoolInfoEditService.UpdateField(school => school.Name = name, schoolId));
            //if (isUpdated)
            //    return Request.CreateResponse(HttpStatusCode.Created);
            //else
            //    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось обновить наименование");
            return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "lol kek");
        }

        [HttpPut]
        public async Task<HttpResponseMessage> UpdatePhone(string phone, string schoolId)
        {
            if (phone == null || schoolId == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");

            var isUpdated = await Task.Run(() => _schoolInfoEditService.UpdateField(school => school.Phone = phone, schoolId));
            if (isUpdated)
                return Request.CreateResponse(HttpStatusCode.Created);
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось обновить номер телефона");
        }

        [HttpPut]
        public async Task<HttpResponseMessage> UpdateEmail(string email, string schoolId)
        {
            if (email == null || schoolId == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Ошибка запроса");

            var isUpdated = await Task.Run(() => _schoolInfoEditService.UpdateField(school => school.Email = email, schoolId));
            if (isUpdated)
                return Request.CreateResponse(HttpStatusCode.Created);
            else
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Не удалось обновить email");
        }
    }
}