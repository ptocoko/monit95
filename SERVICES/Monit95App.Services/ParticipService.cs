using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class ParticipService : IParticipService
    {
        private readonly IUnitOfWork _unitOfWork;
        private IGenericRepository<ProjectParticipsV2> _projectParticipV2Rep;

        private IClassService _classServise;

        public ParticipService(IUnitOfWork unitOfWork, IGenericRepository<ProjectParticipsV2> projectParticipV2Repository, IClassService classService)
        {
            _unitOfWork = unitOfWork;
            _projectParticipV2Rep = projectParticipV2Repository;
            _classServise = classService;
        }

        public Task<ParticipModel> AddAsync(ParticipModel dto)
        {
            return Task.Run(() =>
            {
                if (dto != null)
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

                    _projectParticipV2Rep.Insert(newEntity);
                    _unitOfWork.Save();

                    dto.Id = newEntity.Id;
                }

                return dto;
            });
        }
        public Task<List<ParticipModel>> GetBySchoolIdAsync(string schoolId)
        {
            return Task.Run(() =>
            {
                var dtos = new List<ParticipModel>();
                var entities = _projectParticipV2Rep.GetAll().Where(x => x.SchoolId == schoolId).ToList();

                foreach (var entity in entities)
                {
                    dtos.Add(new ParticipModel
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

        public Task<bool> UpdateAsync(ParticipModel dto)
        {
            return Task.Run(() =>
            {
                if (dto != null && dto.Id != 0)
                {
                    var entity = _projectParticipV2Rep.GetById(dto.Id);
                    entity.ProjectCode = dto.ProjectCode;
                    entity.ParticipCode = dto.ParticipCode;
                    entity.Surname = dto.Surname;
                    entity.Name = dto.Name;
                    entity.SecondName = dto.SecondName;
                    entity.SchoolId = dto.SchoolId;
                    entity.ClassCode = _classServise.GetId(dto.ClassName);

                    _unitOfWork.Save();
                }
                _unitOfWork.Save();

                return true;
            });
            
        }

        public Task<bool> DeleteAsync(int id)
        {
            return Task.Run(() =>
            {
                if (id != 0)
                {
                    _projectParticipV2Rep.Delete(id);
                    _unitOfWork.Save();
                }
                return true;
            });
            

            //throw new NotImplementedException();
        }

        public Task<ParticipModel> GetByParticipIdAsync(int participId)
        {
            return Task.Run(() =>
            {
                if (participId != 0)
                {
                    var particip = _projectParticipV2Rep.GetById(participId);
                    if (particip != null)
                        return new ParticipModel { ClassName = _classServise.GetName(particip.ClassCode), Id = particip.Id, ProjectCode = particip.ProjectCode, ParticipCode = particip.ParticipCode, Surname = particip.Surname, Name = particip.Name, SecondName = particip.SecondName, SchoolId = particip.SchoolId };
                    else
                        throw new NullReferenceException();
                }
                else
                {
                    throw new ArgumentNullException();
                }
            });
        }
    }
}
