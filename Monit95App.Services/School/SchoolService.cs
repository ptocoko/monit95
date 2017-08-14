﻿using System;
using System.Linq;
using AutoMapper;
using Monit95App.Domain.Interfaces;
using Monit95App.Domain.Core;
namespace Monit95App.Services.School
{
	public class SchoolService : ISchoolService
	{
	    private readonly IGenericRepository<Domain.Core.School> _schoolRepository;
	    private readonly IGenericRepository<SchoolsEdit> _schoolEditRepository;

        public SchoolService(IGenericRepository<Domain.Core.School> schoolRepository,
                             IGenericRepository<SchoolsEdit> schoolEditRepository)
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
            Mapper.Initialize(cfg => cfg.CreateMap<Domain.Core.School, SchoolModel>());
            var model = Mapper.Map<Domain.Core.School, SchoolModel>(entity);
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
            
            Mapper.Initialize(cfg => cfg.CreateMap<SchoolModel, Domain.Core.School>()
                        .ForMember(property => property.Name, opt => opt.Ignore())); //property Name set manually
            entity = Mapper.Map(model, entity);

            if (isAdmin)
            {
            #warning i haven't any idea what happens here
                //product.CategoryName = dto.CategoryName;
            }


        }

        private bool CheckHasNameCorrection(string schoolId)
        {
            var nameEditCorrection = _schoolEditRepository.GetById(schoolId);
            return nameEditCorrection != null;                     
        }
    }
}