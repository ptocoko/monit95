﻿using Monit95App.Domain.Core;
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
        private IRepositoryV2<ProjectParticipsV2> _projectParticipV2Rep;

        private IClassService _classServise;

        public ProjectParticipV2Service(IUnitOfWork unitOfWork, IRepositoryV2<ProjectParticipsV2> projectParticipV2Repository, IClassService classService)
        {
            _unitOfWork = unitOfWork;
            _projectParticipV2Rep = projectParticipV2Repository;
            _classServise = classService;
        }

        public Task<ProjectParticipV2Dto> AddAsync(ProjectParticipV2Dto dto)
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
        public Task<List<ProjectParticipV2Dto>> GetBySchoolIdAsync(string schoolId)
        {
            return Task.Run(() =>
            {
                var dtos = new List<ProjectParticipV2Dto>();
                var entities = _projectParticipV2Rep.GetAll().Where(x => x.SchoolId == schoolId).ToList();

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

        public Task<bool> UpdateAsync(ProjectParticipV2Dto dto)
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

       
    }
}