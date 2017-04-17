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

        public ProjectParticipV2Controller()
        {
            var unitOfWork = new UnitOfWorkV2(new cokoContext());

            var projectParticipV2Repository = new Repository<ProjectParticipsV2>(unitOfWork);
            var classRepository = new Repository<Class>(unitOfWork);

            var classService = new ClassService(unitOfWork, classRepository);
            _projectParticipV2Service = new ProjectParticipV2Service(unitOfWork, projectParticipV2Repository, classService);
        }

        public async Task<IEnumerable<ProjectParticipV2Dto>> GetBySchoolId(string id)
        {
            if(!String.IsNullOrEmpty(id))
            {
                return await _projectParticipV2Service.GetBySchoolIdAsync(id);
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
