using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using Monit95App.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using Monit95App.Domain.Core;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services
{
    public class MarksService : IMarksService
    {
        #region Dependencies

        private readonly IGenericRepository<Result> _resultRepository;

        #endregion

        public MarksService(IGenericRepository<Result> resultRepository)
        {
            _resultRepository = resultRepository;
        }

        public void Add(MarksDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException();
            }
            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            Validator.ValidateObject(dto, validContext, true); //TODO: SO. Why do not work without third parametr true?

            Mapper.Initialize(cfg => cfg.CreateMap<MarksDto, Result>());
            var entity = Mapper.Map<MarksDto, Result>(dto);

            _resultRepository.Insert(entity);            
        }

        public IEnumerable<ParticipMarksDto> GetParticipMarksDtos(int projectTestId, string schoolId)
        {
            if (schoolId == null)
            {
                throw new ArgumentNullException(nameof(schoolId));
            }
            var entities = _resultRepository.GetAll().Where(x => x.ParticipTest.ProjectTestId == projectTestId
                                                              && x.ParticipTest.Particip.SchoolId == schoolId)
                                                              .ToList();
            if (!entities.Any())
            {
                throw new ArgumentException("projectTestId or schoolId is incorrect");
            }

            Mapper.Initialize(cfg => cfg.CreateMap<Result, ParticipMarksDto>()
                    .ForMember(dist => dist.Surname, opt => opt.MapFrom(src => src.ParticipTest.Particip.Surname))
                    .ForMember(dist => dist.Name, opt => opt.MapFrom(src => src.ParticipTest.Particip.Name))
                    .ForMember(dist => dist.SecondName, opt => opt.MapFrom(src => src.ParticipTest.Particip.SecondName))
                    .ForMember(dist => dist.ClassName, opt => opt.MapFrom(src => src.ParticipTest.Particip.Class.Name))            
            );

            var dtos = Mapper.Map<IEnumerable<Result>, List<ParticipMarksDto>>(entities);

            return dtos;
        }
    }
}
