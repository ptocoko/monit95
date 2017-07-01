using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Monit95App.Domain.DTO.Interfaces;
using Monit95App.Domain.DTO;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core;

namespace Monit95App.Api
{
    public class ParticipController : ApiController
    {
        private IParticipService _participService;

        public ParticipController(IParticipService participService)
        {
            _participService = participService;
        }
        
        public async Task<HttpResponseMessage> Post(ParticipModel model)
        {
            if (model != null)
            {
                await _participService.AddAsync(model);
                return Request.CreateResponse(HttpStatusCode.Created, model);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось добавить участника");
            }
        }

        //read
        public async Task<IEnumerable<ParticipModel>> GetBySchoolId(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                return await _participService.GetBySchoolIdAsync(id);
            }
            return null;
        }

        //delete
        public async Task<HttpResponseMessage> Delete(int id)
        {
            if (id != 0)
            {
                await _participService.DeleteAsync(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            throw new ArgumentNullException("async Task<HttpResponseMessage> Delete(int id)");
        }

        [HttpPut]
        public async Task<HttpResponseMessage> Update(ParticipModel dto)
        {
            if (dto != null)
            {
                try
                {
                    await _participService.UpdateAsync(dto);
                }
                catch (ArgumentNullException)
                {
                    Request.CreateResponse(HttpStatusCode.Conflict);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }

            throw new ArgumentNullException("async Task<HttpResponseMessage> Update(ProjectParticipV2Dto dto)");
        }
    }
}
