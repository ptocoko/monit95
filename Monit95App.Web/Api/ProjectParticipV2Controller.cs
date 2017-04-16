using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Monit95App.Services.DTO.Interfaces;
using Monit95App.Services.DTO;
using System.Threading.Tasks;


namespace Monit95App.Api
{
    public class ProjectParticipV2Controller : ApiController
    {
        private IProjectParticipV2Service _projectParticipV2Service;

        public async Task<IEnumerable<ProjectParticipV2Dto>> GetBySchoolId(string schoolId)
        {
            if(!String.IsNullOrEmpty(schoolId))
            {
                return await _projectParticipV2Service.GetBySchoolIdAsync(schoolId);
            }

            else
            {
                return null;
            }

        }

        public async void Delete(ProjectParticipV2Dto dto)
        {
            if(dto != null)
            {
                await _projectParticipV2Service.DeleteAsync(dto);
            }
            else
            {
                throw new ArgumentNullException("Delete(ProjectParticipV2Dto dto)");
            }
        }
    }
}
