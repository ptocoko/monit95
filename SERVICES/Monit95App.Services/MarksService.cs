using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using Monit95App.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using Monit95App.Domain.Core.Entities;
// ReSharper disable StyleCop.SA1600
// ReSharper disable InconsistentNaming
// ReSharper disable StyleCop.SA1101
// ReSharper disable ArrangeThisQualifier
namespace Monit95App.Services
{
    /// <summary>
    /// The marks service.
    /// </summary>
    public class MarksService : IMarksService
    {
        #region Dependencies

        private readonly IGenericRepository<Result> _resultRepository;
        private readonly IGenericRepository<Particip> _participRepository;
        private readonly IGenericRepository<ParticipTest> _participTestRepository;

        #endregion

        public MarksService(IGenericRepository<Result> resultRepository, 
                            IGenericRepository<Particip> participRepository, 
                            IGenericRepository<ParticipTest> participTestRepository)
        {
            _resultRepository = resultRepository;
            _participRepository = participRepository;
            _participTestRepository = participTestRepository;
        }

        public void Add(PostMarksDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException();
            }
            var validContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            Validator.ValidateObject(dto, validContext, true); // TODO: SO. Why do not work without third parametr true?

            Mapper.Initialize(cfg => cfg.CreateMap<PostMarksDto, Result>());
            var entity = Mapper.Map<PostMarksDto, Result>(dto);

            _resultRepository.Insert(entity);            
        }

        public IEnumerable<ParticipMarksDto> GetParticipMarksDtos(int projectTestId, string schoolId)
        {
            if (schoolId == null)
            {
                throw new ArgumentNullException(nameof(schoolId));
            }
            throw new NotImplementedException();
            //var entities = _resultRepository.GetAll().Where(x => x.ParticipTest.ProjectTestId == projectTestId
            //&& x.ParticipTest.Particip.SchoolId == schoolId)
            //.ToList();
            //if (!entities.Any())
            //{
            //    throw new ArgumentException("projectTestId or schoolId is incorrect");
            //}

            //Mapper.Initialize(cfg => cfg.CreateMap<Result, ParticipMarksDto>()
            //        .ForMember(dist => dist.Surname, opt => opt.MapFrom(src => src.ParticipTest.Particip.Surname))
            //        .ForMember(dist => dist.Name, opt => opt.MapFrom(src => src.ParticipTest.Particip.Name))
            //        .ForMember(dist => dist.SecondName, opt => opt.MapFrom(src => src.ParticipTest.Particip.SecondName))
            //    .ForMember(dist => dist.ClassName, opt => opt.MapFrom(src => src.ParticipTest.Particip.Class.Name)));

            //var dtos = Mapper.Map<IEnumerable<Result>, List<ParticipMarksDto>>(entities);

            /////////////////////////////////////////////////////////////////////////////

            //var dtos = from particips in _participRepository.GetAll()
            //           where particips.ProjectId == projectTestId && particips.SchoolId == schoolId
            //           join participTest in _participTestRepository.GetAll() on particips.Id equals participTest.ParticipId
            //           into a
            //           from participMarks in a.DefaultIfEmpty()
            //           select new ParticipMarksDto
            //           {
            //               ParticipTestId = participMarks.Id,
            //               Surname = particips.Surname,
            //               Name = particips.Name,
            //               SecondName = particips.SecondName,
            //               ClassName = particips.Class.Name,
            //               Marks = participMarks.Result.Marks
            //           };

            ///////////////////////////////////////////////////////////////////////////////////

            //var dtos = _participTestRepository.GetAll().Where(p => p.ProjectTestId == projectTestId && p.Particip.SchoolId == schoolId).ToList();

            //Mapper.Initialize(cfg => cfg.CreateMap<ParticipTest, ParticipMarksDto>()
            //    .ForMember(dest => dest.Marks, opt => opt.Al));
            //return dtos;

        }

        public void Update(int participTestId, PutMarksDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            Validator.ValidateObject(dto, validationContext, true);

            var entity = _resultRepository.GetById(participTestId);
            if (entity == null)
            {
                throw new ArgumentException(nameof(participTestId));
            }

            Mapper.Initialize(cfg => cfg.CreateMap<PutMarksDto, Result>());
            Mapper.Map(dto, entity);            

            _resultRepository.Update(entity);
        }
    }
}
