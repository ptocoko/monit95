using AutoMapper;
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
        private readonly IMapper mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<Particip> _participRepository;
        private readonly IClassService _classServise;

        public ParticipService(IUnitOfWork unitOfWork, IGenericRepository<Particip> participRepository, IClassService classService)
        {
            _unitOfWork = unitOfWork;
            _participRepository = participRepository;
            _classServise = classService;

            var mapConfig = new MapperConfiguration(cfg => cfg.CreateMap<Particip, ParticipModel>().ReverseMap());
            mapper = mapConfig.CreateMapper();
        }

        public ParticipModel Add(ParticipModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            #warning add validation
            //...
            Mapper.Initialize(cfg => cfg.CreateMap<ParticipModel, Particip>());
            var entity = mapper.Map<ParticipModel, Particip>(model);            

            entity.ClassCode = _classServise.GetId(model.ClassName); //ClassName => ClassCode

            _participRepository.Insert(entity);
            _unitOfWork.Save();

            model.Id = entity.Id;

            return model;
        }
        public IEnumerable<ParticipModel> GetBySchoolId(string schoolId)
        {
            if(schoolId == null)
            {
                throw new ArgumentNullException(nameof(schoolId));
            }
            
            var entities = _participRepository.GetAll().Where(particip => particip.SchoolId == schoolId).ToList();
            if(!entities.Any())
            {
                throw new ArgumentException(nameof(schoolId));
            }

            var models = mapper.Map<List<Particip>, List<ParticipModel>>(entities);
           
            return models;
        }

        public Task<bool> UpdateAsync(ParticipModel dto)
        {
            return Task.Run(() =>
            {
                if (dto != null && dto.Id != 0)
                {
                    var entity = _participRepository.GetById(dto.Id);
                    entity.ProjectCode = dto.ProjectCode;                    
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
                    _participRepository.Delete(id);
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
                    var particip = _participRepository.GetById(participId);
                    if (particip != null)
                        return new ParticipModel { ClassName = _classServise.GetName(particip.ClassCode), Id = particip.Id, ProjectCode = particip.ProjectCode, Surname = particip.Surname, Name = particip.Name, SecondName = particip.SecondName, SchoolId = particip.SchoolId };
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
