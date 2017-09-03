using Microsoft.AspNet.Identity;
using Monit95App.Models;
using Monit95App.Services;
using Monit95App.Web.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using Monit95App.Services.Interfaces;

namespace Monit95App.Web.Api
{    
    [Authorize]
    public class FilesController : ApiController
    {
        #region Fields

        private readonly IRsurReportModelConverter _rsurReportModelConverter;        
        private readonly IAccountService _userService;

        #endregion

        #region Methods

        public FilesController(IRsurReportModelConverter rsurReportModelConverter, IAccountService userService)
        {
            _rsurReportModelConverter = rsurReportModelConverter;
            _userService = userService;
        }

        public FilesController()
        {

        }

        #endregion

        #region Api

        #warning readable is bad
        [Route("api/files/rsurParticipLists/{id}")]
        public async Task<HttpResponseMessage> Get(string id) //id = userName
        {
            if (id == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "В запросе отсутствует или указан не верный id");
            }

            var authorizedUser = _userService.GetModel(User.Identity.GetUserId());
            var authorizedUserRoleNames = authorizedUser.RoleNames;
            if (!authorizedUser.UserName.Equals(id)) //compare request user and current (real) user           
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не верный пользователь");

            Stream stream = null;
            if (authorizedUser.RoleNames.Contains("area"))
                stream = await _rsurReportModelConverter.GetStream(Convert.ToInt32(id));
            if (authorizedUser.RoleNames.Contains("school"))
                stream = await _rsurReportModelConverter.GetStream(schoolId: id);

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StreamContent(stream),
            };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
            {
                FileName = $"{id}-рсур-список участников.xlsx"
            };
            return response;
        }

        #endregion
    }
}
