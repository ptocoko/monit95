using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Monit95App.Services.DTO.Interfaces;
using Monit95App.Services.DTO;
using System.Threading.Tasks;
using Monit95App.Infrastructure.Data;
using Monit95App.Domain.Core;

namespace Monit95App.Api
{
    public class ProjectParticipV2Controller : ApiController
    {
        private IProjectParticipV2Service _projectParticipV2Service;

        public ProjectParticipV2Controller(IProjectParticipV2Service projectParticipV2Service)
        {
            _projectParticipV2Service = projectParticipV2Service;
        }

        //create
        //public async Task<HttpResponseMessage> Post(ProjectParticipV2Dto dto)
        //{
        //    if(dto != null)
        //    {
        //        await _projectParticipV2Service.AddAsync(dto);
        //        return Request.CreateResponse(HttpStatusCode.Created, dto);
        //    }
        //    else
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось добавить участника");
        //    }            
        //}

        //read
        public async Task<IEnumerable<ProjectParticipV2Dto>> GetBySchoolId(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                return await _projectParticipV2Service.GetBySchoolIdAsync(id);
            }
            return null;
        }

        //delete
        public async Task<HttpResponseMessage> Delete(int id)
        {
            if (id != 0)
            {
                await _projectParticipV2Service.DeleteAsync(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            throw new ArgumentNullException("async Task<HttpResponseMessage> Delete(int id)");
        }

        [HttpPut]
        public async Task<HttpResponseMessage> Update(ProjectParticipV2Dto dto)
        {
            if (dto != null)
            {
                try
                {
                    await _projectParticipV2Service.UpdateAsync(dto);
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
