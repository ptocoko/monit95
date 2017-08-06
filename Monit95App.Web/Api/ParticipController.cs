using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;

namespace Monit95App.Api
{
    public class ParticipController : ApiController
    {
        private readonly IParticipService _participService;

        public ParticipController(IParticipService participService)
        {
            _participService = participService;
        }
        
        public HttpResponseMessage Post(ParticipModel model)
        {
            if (model == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось добавить участника");
            }
                
            _participService.AddAsync(model);
            return Request.CreateResponse(HttpStatusCode.Created, model);
        }

        //read
        public IEnumerable<ParticipModel> GetBySchoolId(string id)
        {
            return !string.IsNullOrEmpty(id) ? _participService.GetBySchoolIdAsync(id) : null;
        }

        //delete
        public HttpResponseMessage Delete(int id)
        {
            if (id == 0)
            {
                throw new ArgumentNullException("async Task<HttpResponseMessage> Delete(int id)");
            }
            _participService.DeleteAsync(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPut]
        public HttpResponseMessage Update(ParticipModel dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException("async Task<HttpResponseMessage> Update(ProjectParticipV2Dto dto)");
            }
                
            try
            {
                _participService.UpdateAsync(dto);
            }
            catch (ArgumentNullException)
            {
                Request.CreateResponse(HttpStatusCode.Conflict);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
