using AutoMapper;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monit95App.Services
{
    public class ParticipService : IParticipService
    {
        #region Fields

        private readonly IMapper mapper;

        #endregion

        #region Dependencies

        private readonly IGenericRepository<Particip> _participRepository;
        private readonly IClassService _classServise;

        #endregion

        public ParticipService(IGenericRepository<Particip> participRepository, IClassService classService)
        {            
            _participRepository = participRepository;
            _classServise = classService;

            var mapConfig = new MapperConfiguration(cfg => cfg.CreateMap<Particip, ParticipDto>().ReverseMap());
            mapper = mapConfig.CreateMapper();
        }

        public int Add(ParticipDto dto)
        {
            //Validation
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }                        
            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            Validator.ValidateObject(dto, validContext);
            
            Mapper.Initialize(cfg => cfg.CreateMap<ParticipDto, Particip>());
            var entity = mapper.Map<ParticipDto, Particip>(dto);            

            var classCode = _classServise.GetId(dto.ClassName); //ClassName => ClassCode
            entity.ClassCode = classCode ?? throw new ArgumentException(nameof(dto.ClassName));

            _participRepository.Insert(entity);                        

            return entity.Id;
        }

        public IEnumerable<ParticipDto> GetBySchoolId(string schoolId)
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

            var models = mapper.Map<List<Particip>, List<ParticipDto>>(entities);
           
            return models;
        }

        public bool Update(ParticipDto dto)
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

                _participRepository.Save();
            }
            _participRepository.Save();

            return true;
        }

        public Task<bool> DeleteAsync(int id)
        {
            return Task.Run(() =>
            {
                if (id != 0)
                {
                    _participRepository.Delete(id);                    
                }
                return true;
            });
            

            //throw new NotImplementedException();
        }       

        public ParticipDto GetById(int participId)
        {
            if(participId <= 0)
            {
                throw new ArgumentException(nameof(participId));
            }

            var entity = _participRepository.GetById(participId);
            if(entity == null)
            {
                throw new ArgumentException(nameof(participId));
            }

            Mapper.Initialize(cfg => cfg.CreateMap<Particip, ParticipDto>());                

            var dto = Mapper.Map<Particip, ParticipDto>(entity);

            return dto;
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
