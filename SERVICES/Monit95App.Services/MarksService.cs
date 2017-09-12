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

            var dtos = from participTest in _participTestRepository.GetAll()
                       where participTest.ProjectTestId == projectTestId && participTest.Particip.SchoolId == schoolId
                       join particip in _participRepository.GetAll() on participTest.ParticipId equals particip.Id
                       join a in _resultRepository.GetAll() on participTest.Id equals a.ParticipTestId
                       into b
                       from result in b.DefaultIfEmpty()
                       select new ParticipMarksDto
                       {
                           ParticipTestId = participTest.Id,
                           Surname = particip.Surname,
                           Name = particip.Name,
                           SecondName = particip.SecondName,
                           ClassName = particip.Class.Name,
                           Marks = result.Marks
                       };

            return dtos.ToList();
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
