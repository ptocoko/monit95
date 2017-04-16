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
    public class ProjectParticipV2Service : IProjectParticipV2Service
    {
        private IUnitOfWork _unitOfWork;
        private IRepositoryV2<ProjectParticipsV2> _projectParticipV2Repository;

        private IClassService _classServise;

        public ProjectParticipV2Service(IUnitOfWork unitOfWork, IRepositoryV2<ProjectParticipsV2> projectParticipV2Repository, IClassService classService)
        {
            _unitOfWork = unitOfWork;
            _projectParticipV2Repository = projectParticipV2Repository;
            _classServise = classService;
        }

        public Task <List<ProjectParticipV2Dto>> GetBySchoolIdAsync(string schoolId)
        {
            return Task.Run(() =>
            {
                var dtos = new List<ProjectParticipV2Dto>();
                var entities = _projectParticipV2Repository.GetAll().Where(x => x.SchoolId == schoolId);

                foreach (var entity in entities)
                {
                    dtos.Add(new ProjectParticipV2Dto
                    {
                        Id = entity.Id,
                        ProjectCode = entity.ProjectCode,
                        ParticipCode = entity.ParticipCode,
                        Surname = entity.Surname,
                        Name = entity.Name,
                        SecondName = entity.SecondName,
                        SchoolId = entity.SchoolId,
                        ClassName = entity.Class.Name
                    });
                }
                return dtos;
            });           
        }

        public void Add(ProjectParticipV2Dto dto)
        {
            if(dto != null)
            {
                var newEntity = new ProjectParticipsV2
                {
                    ProjectCode = dto.ProjectCode,
                    ParticipCode = dto.ParticipCode,
                    Surname = dto.Surname,
                    Name = dto.Name,
                    SecondName = dto.SecondName,
                    SchoolId = dto.SchoolId
                };

                newEntity.ClassCode = _classServise.GetId(dto.ClassName); //ClassName => ClassCode

                _projectParticipV2Repository.Insert(newEntity);
                _unitOfWork.Save();
            }
        }

        public void Update(ProjectParticipV2Dto dto)
        {
            var entity = _projectParticipV2Repository.GetAll().Single(x => x.Id == dto.Id);

            entity.Surname = dto.Surname;
            entity.Name = dto.Name;
            entity.SecondName = dto.SecondName;
            entity.ClassCode = _classServise.GetId(dto.ClassName);

            _projectParticipV2Repository.Update(entity);
            _unitOfWork.Save();
        }

        public Task DeleteAsync(ProjectParticipV2Dto item)
        {
            throw new NotImplementedException();
        }
    }
}
