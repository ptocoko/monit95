using System;
using System.Linq;
using AutoMapper;
using Monit95App.Domain.Interfaces;
using Monit95App.Domain.Core;
using Monit95App.Services.Interfaces;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services.School
{
	public class SchoolService : ISchoolService
	{
	    private readonly IGenericRepository<Domain.Core.Entities.School> _schoolRepository;
	    private readonly IGenericRepository<SchoolEdit> _schoolEditRepository;

        public SchoolService(IGenericRepository<Domain.Core.Entities.School> schoolRepository,
                             IGenericRepository<SchoolEdit> schoolEditRepository)
	    {
	        _schoolRepository = schoolRepository;
	        _schoolEditRepository = schoolEditRepository;
        }
        
        public SchoolModel GetModel(string id)
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
            Mapper.Initialize(cfg => cfg.CreateMap<Domain.Core.Entities.School, SchoolModel>());
            var model = Mapper.Map<Domain.Core.Entities.School, SchoolModel>(entity);
            model.AreaName = $"{entity.Area.Code} - {entity.Area.Name}";
            model.HasNameCorrection = CheckHasNameCorrection(entity.Id);

            return model;
        }

        public void Update(string schoolId, SchoolModel model, bool isAdmin)
        {
            if (schoolId == null || model == null)
            {
                throw new ArgumentNullException();
            }

            var entity = _schoolRepository.GetById(schoolId);
            if (entity == null)
            {
                throw new ArgumentException(nameof(schoolId));
            }
            
            Mapper.Initialize(cfg => cfg.CreateMap<SchoolModel, Domain.Core.Entities.School>()
                        .ForMember(property => property.Name, opt => opt.Ignore())); //property Name set manually
            entity = Mapper.Map(model, entity);

        }

        private bool CheckHasNameCorrection(string schoolId)
        {
            var nameEditCorrection = _schoolEditRepository.GetById(schoolId);
            return nameEditCorrection != null;                     
        }
    }
}