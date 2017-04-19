using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services.DTO
{
    public class ProjectParticipV2MarksService : IProjectParticipV2MarksService
    {
        IUnitOfWork _unitOfWork;
        IRepositoryV2<ExerciseMark> _projectParticipV2MarksRepository;

        public ProjectParticipV2MarksService(IUnitOfWork unitOfWork, IRepositoryV2<ExerciseMark> projectParticipV2MarksRepository)
        {
            _unitOfWork = unitOfWork;
            _projectParticipV2MarksRepository = projectParticipV2MarksRepository;
        }

        public Task<bool> AddAsync(ProjectParticipV2MarksDto marks)
        {
            throw new NotImplementedException();
        }

        public Task<List<ProjectParticipV2MarksDto>> GetBySchoolAndTestIdAsync(string schoolId, Guid testId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(ProjectParticipV2MarksDto marks)
        {
            throw new NotImplementedException();
        }
    }
}
