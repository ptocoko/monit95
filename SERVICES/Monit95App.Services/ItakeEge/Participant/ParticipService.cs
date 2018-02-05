using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Extensions;
using ServiceResult.Exceptions;

namespace Monit95App.Services.ItakeEge.Participant
{
    /// <summary>
    /// Класс-сервис для работы с участниками
    /// </summary>
    /// TODO: set autommaper configuration in application startup
    public class ParticipService : IParticipService
    {
        #region Fields

        //private readonly IMapper _mapper;
        private const int ItakeEgeProjectId = 12;

        private readonly MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<Particip, ParticipGetViewDto>()
            .ForMember(d => d.DocumNumber, opt => opt.MapFrom(src => (int)src.DocumNumber))
            .ReverseMap());

        #endregion

        #region Dependencies

        private readonly CokoContext cokoContext;

        #endregion

        #region Constructors

        public ParticipService(CokoContext cokoContext)
        {
            this.cokoContext = cokoContext;            

            //_mapper = mapConfig.CreateMapper();
        }

        #endregion

        /// <summary>
        /// Добавление участника "Я сдам ЕГЭ!"
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="schoolId"></param>
        /// <param name="dataSource"></param>
        /// <returns></returns>
        public int Add(ParticipPostOrPutDto dto, string schoolId, string dataSource)
        {
            // Validate
            var validationResults = new Collection<ValidationResult>();
            var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            var isValidDto = Validator.TryValidateObject(dto, validationContext, validationResults, true);
            if (!isValidDto)
                throw new ArgumentException(nameof(dto));
            if (string.IsNullOrWhiteSpace(schoolId))
                throw new StringIsNullOrEmpty(nameof(schoolId));
            if (string.IsNullOrWhiteSpace(dataSource))
                throw new StringIsNullOrEmpty(dataSource);
            
            // Create new participant entity
            var newParticip = new Particip
            {
                ProjectId = ItakeEgeProjectId,
                Surname = dto.Surname.NormalizeName(),                
                Name = dto.Name.NormalizeName(),                
                DocumNumber = dto.DocumNumber,
                SchoolId = schoolId,
                DataSource = dataSource                
            };
            if (dto.SecondName != null)            
                newParticip.SecondName = dto.SecondName.NormalizeName(); 
                        
            newParticip.ParticipTests.Add(new ParticipTest { ProjectTestId = 2013 }); // русский язык
            newParticip.ParticipTests.Add(new ParticipTest { ProjectTestId = 2014 }); // математика п
            newParticip.ParticipTests.Add(new ParticipTest { ProjectTestId = 2015 }); // математика б 

            // Try add new participant entity in database
            cokoContext.Particips.Add(newParticip);
            try
            {
                cokoContext.SaveChanges();
            }
            catch (DbUpdateException exception) when ((exception.InnerException?.InnerException as SqlException)?.Number == 2601 || // violation in unique index
                                                      (exception.InnerException?.InnerException as SqlException)?.Number == 2627) // violation in unique constraint (although it is implemented using unique index)
            {
                throw new DublicateEntityException();
            }

            return newParticip.Id;
        }

        /// <summary>
        /// Получения списка участников для муниципального оператора
        /// </summary>
        /// <param name="areaCode"></param>
        /// <returns></returns>
        public IEnumerable<ParticipGetViewDto> GetAllParticipantsByArea(int areaCode)
        {
            if(!areaCode.IsBetween(201, 217))
                throw new ArgumentOutOfRangeException($"{nameof(areaCode)} parameter value must be between 201 and 217");
            var entities = cokoContext.Particips.AsNoTracking()
                .Where(p => p.ProjectId == ItakeEgeProjectId && p.School.AreaCode == areaCode)
                .ProjectTo<ParticipGetViewDto>(mapperConfiguration);                                                           

            return entities;
        }

        /// <summary>
        /// Получения списка участников для школьного координатора
        /// </summary>
        /// <param name="schoolId"></param>
        /// <returns></returns>
        /// TODO: use automapper
        public IEnumerable<ParticipGetViewDto> GetAllParticipantsBySchool(string schoolId)
        {
            if (!cokoContext.Schools.Any(s => s.Id == schoolId))
                throw new ArgumentException(nameof(schoolId));
            var entities = cokoContext.Particips.AsNoTracking()
                .Where(p => p.ProjectId == ItakeEgeProjectId && p.SchoolId == schoolId)
                .ProjectTo<ParticipGetViewDto>(mapperConfiguration);               

            return entities;
        }

        /// <summary>
        /// Обновление данных об участнике
        /// </summary>
        /// <param name="id"></param>
        /// <param name="schoolId">Используется для авторизации</param>
        /// <param name="dto"></param>
        public void Update(int id, string schoolId, ParticipPostOrPutDto dto)
        {
            // Validate
            var validationResults = new Collection<ValidationResult>();
            var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(dto);
            var isValidDto = Validator.TryValidateObject(dto, validationContext, validationResults, true);
            if (!isValidDto)
                throw new ArgumentException(nameof(dto));

            var entity = cokoContext.Particips.SingleOrDefault(p => p.Id == id && p.SchoolId == schoolId);
            if (entity == null)
                throw new EntityNotFoundOrAccessException();

            var mapper = mapperConfiguration.CreateMapper();
            mapper.Map(dto, entity);                       

            cokoContext.SaveChanges();
        }                 

        /// <summary>
        /// Удаление участника
        /// </summary>
        /// <param name="participId"></param>
        /// <param name="schoolId"></param>
        /// TODO: refac
        public void Delete(int participId, string schoolId)
        {
            var participEntity = cokoContext.Particips.SingleOrDefault(p => p.Id == participId && p.SchoolId == schoolId);
            if (participEntity == null)
                throw new EntityNotFoundOrAccessException();
            cokoContext.Particips.Remove(participEntity);

            cokoContext.SaveChanges();
        }                
    }
}