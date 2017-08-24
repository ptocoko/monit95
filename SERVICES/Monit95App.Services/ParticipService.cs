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
using Monit95App.Services.DTOs;

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

            var mapConfig = new MapperConfiguration(cfg => cfg.CreateMap<Particip, ParticipDto>().ReverseMap()
                                                        .AfterMap((dto, entity) => entity.Class = null));
            mapper = mapConfig.CreateMapper();
        }

        public int Add(ParticipDto dto)
        {
            //Validation       
            if(dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }
            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            Validator.ValidateObject(dto, validContext, true);
            
            var entity = mapper.Map<ParticipDto, Particip>(dto);
            
            #warning move to mapper
            entity.ClassCode = _classServise.GetId(dto.ClassName); //ClassName => ClassCode            
            
            _participRepository.Insert(entity);                        

            return entity.Id;
        }

        public IEnumerable<ParticipDto> GetAllDtos(int? areaCode, string schoolId)
        {
            var query = _participRepository.GetAll();
            if(areaCode != null)
            {
                query = query.Where(particip => particip.School.AreaCode == areaCode);
            }
            if (schoolId != null)
            {
                query = query.Where(particip => particip.SchoolId == schoolId);
            }

            var entities = query.ToList();        
            var dtos = mapper.Map<List<Particip>, List<ParticipDto>>(entities);
           
            return dtos;
        }

        public void Update(int id, ParticipDto dto)
        {           
            if(dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }
            var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            Validator.ValidateObject(dto, validationContext, true);
            var entity = _participRepository.GetById(id);
            if (entity == null)
            {
                throw new ArgumentException(nameof(id));
            }

            mapper.Map(dto, entity);

            _participRepository.Update(entity);
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
