using System;

using AutoMapper;

using Monit95App.Domain.Core.Entities;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;

namespace Monit95App.Services.School
{
    using Monit95App.Infrastructure.Data;
    using System.Collections.Generic;
    using System.Linq;

    using School = Monit95App.Domain.Core.Entities.School;

    public class SchoolService : ISchoolService
    {
        private readonly IGenericRepository<Domain.Core.Entities.School> _schoolRepository;
        private readonly IGenericRepository<SchoolEdit> _schoolEditRepository;

        public SchoolService(
            IGenericRepository<Domain.Core.Entities.School> schoolRepository,
            IGenericRepository<SchoolEdit> schoolEditRepository)
        {
            _schoolRepository = schoolRepository;
            _schoolEditRepository = schoolEditRepository;
        }
        
        public SchoolDto GetModel(string id)
        {            
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            var entity = _schoolRepository.GetById(id);
            if (entity == null)
            {
                throw new ArgumentException("Нет организации с таким Id");
            }

            Mapper.Initialize(cfg => cfg.CreateMap<Domain.Core.Entities.School, SchoolDto>());
            var model = Mapper.Map<Domain.Core.Entities.School, SchoolDto>(entity);
            model.AreaCodeWithName = $"{entity.Area.Code} - {entity.Area.Name}";
            model.HasNameCorrection = CheckHasNameCorrection(entity.Id);

            return model;
        }

        public IEnumerable<SchoolDto> GetAll()
        {
            var context = new CokoContext();
            var entities = context.Schools.ToList();
            //var entities = this._schoolRepository.GetAll().ToList();

            Mapper.Initialize(
                cfg => cfg.CreateMap<School, SchoolDto>()
                    .ForMember(dist => dist.SchoolIdWithName, opt => opt.MapFrom(src => $"{src.Id} - {src.Name}"))
                    .ForMember(dist => dist.AreaCodeWithName, opt => opt.MapFrom(src => $"{src.AreaCode} - {src.Area.Name.TrimEnd()}")));

            var dtos = Mapper.Map<IEnumerable<School>, List<SchoolDto>>(entities);

            return dtos;
        }

        public void Update(string schoolId, SchoolDto dto, bool isAdmin)
        {
            if (schoolId == null || dto == null)
            {
                throw new ArgumentNullException();
            }

            var entity = _schoolRepository.GetById(schoolId);
            if (entity == null)
            {
                throw new ArgumentException(nameof(schoolId));
            }
            
            Mapper.Initialize(cfg => cfg.CreateMap<SchoolDto, Domain.Core.Entities.School>()
                        .ForMember(property => property.Name, opt => opt.Ignore())); //property Name set manually
            entity = Mapper.Map(dto, entity);

        }

        private bool CheckHasNameCorrection(string schoolId)
        {
            var nameEditCorrection = _schoolEditRepository.GetById(schoolId);
            return nameEditCorrection != null;                     
        }
    }
}