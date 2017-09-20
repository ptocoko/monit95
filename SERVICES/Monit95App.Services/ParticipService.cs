using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

using AutoMapper;

using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;

namespace Monit95App.Services
{
    public class ParticipService : IParticipService
    {
        #region Fields

        private readonly IMapper _mapper;

        #endregion

        #region Dependencies

        private readonly IGenericRepository<Particip> _participRepository;
        private readonly IClassService _classServise;

        #endregion

        public ParticipService(IGenericRepository<Particip> participRepository, IClassService classService)
        {
            _participRepository = participRepository;
            _classServise = classService;

            var mapConfig = new MapperConfiguration(cfg => cfg.CreateMap<Particip, ParticipDto>()
                //.ForMember(d => d.ClassName, opt => opt.Ignore())
                .ReverseMap()
                .ForPath(d => d.Class.Name, opt => opt.Ignore())
                .ForMember(d => d.ClassId, opt => opt.MapFrom(src => _classServise.GetId(src.ClassName))));

            _mapper = mapConfig.CreateMapper();
        }

        public int Add(ParticipDto dto)
        {
            // Validation       
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            Validator.ValidateObject(dto, validContext, true);
            
            var entity = _mapper.Map<ParticipDto, Particip>(dto);            

            var schoolClassEntities = _participRepository.GetAll().Where(x => x.ProjectId == entity.ProjectId
                                                                           && x.SchoolId == entity.SchoolId
                                                                           && x.ClassId == entity.ClassId
                                                                           && x.Surname == entity.Surname
                                                                           && x.Name == entity.Name
                                                                           && x.SecondName == entity.SecondName).ToList();
            
            if (schoolClassEntities.Any())
            {               
                return -1;
            }

            _participRepository.Insert(entity);
            return entity.Id;
        }

        public IEnumerable<ParticipDto> GetAll(int projectId, int? areaCode, string schoolId)
        {
            var query = _participRepository.GetAll()
                                 .Where(x => x.ProjectId == projectId);
            if (areaCode != null)
            {
                query = query.Where(particip => particip.School.AreaCode == areaCode);
            }

            if (schoolId != null)
            {
                query = query.Where(particip => particip.SchoolId == schoolId);
            }

            var entities = query.ToList();
            
            var dtos = _mapper.Map<List<Particip>, List<ParticipDto>>(entities);

            return dtos.OrderBy(x => x.ClassName).ThenBy(x => x.Surname).ThenBy(x => x.Name);
        }

        public void Update(int id, ParticipDto dto)
        {
            if (dto == null)
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

            _mapper.Map(dto, entity);
            //entity.Class = null;
            //entity.ClassId = _classServise.GetId(dto.ClassName);

            _participRepository.Update(entity);
        }          

        public ParticipDto GetById(int participId)
        {
            if (participId <= 0)
            {
                throw new ArgumentException(nameof(participId));
            }

            var entity = _participRepository.GetById(participId);
            if (entity == null)
            {
                throw new ArgumentException(nameof(participId));
            }

            Mapper.Initialize(cfg => cfg.CreateMap<Particip, ParticipDto>());                

            var dto = Mapper.Map<Particip, ParticipDto>(entity);

            return dto;
        }
    }
}
