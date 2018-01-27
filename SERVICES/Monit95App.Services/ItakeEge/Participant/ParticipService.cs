using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using AutoMapper;
using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.Extensions;
using ServiceResult.Exceptions;

namespace Monit95App.Services.ItakeEge.Participant
{
    public class ParticipService : IParticipService
    {
        #region Fields

        private readonly IMapper _mapper;
        private const int ItakeEgeProjectId = 12;

        #endregion

        #region Dependencies

        private readonly CokoContext cokoContext;

        #endregion

        #region Constructors

        public ParticipService(CokoContext cokoContext)
        {
            this.cokoContext = cokoContext;
        }

        #endregion

        /// <summary>
        /// Добавление участника "Я сдам ЕГЭ!"
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="schoolId"></param>
        /// <param name="dataSource"></param>
        /// <returns></returns>
        public int Add(ParticipPostDto dto, string schoolId, string dataSource)
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
                Surname = dto.Surname.Trim(),                
                Name = dto.Name.Trim(),                
                DocumNumber = dto.DocumNumber,
                SchoolId = schoolId,
                DataSource = dataSource                
            };
            if (dto.SecondName != null)            
                newParticip.SecondName = dto.SecondName.Trim(); 
                        
            newParticip.ParticipTests.Add(new ParticipTest { ParticipId = 2013 }); // русский язык
            newParticip.ParticipTests.Add(new ParticipTest { ParticipId = 2014 }); // математика п
            newParticip.ParticipTests.Add(new ParticipTest { ParticipId = 2015 }); // математика б 

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

            var entities = cokoContext.Particips.Where(p => p.ProjectId == ItakeEgeProjectId && p.School.AreaCode == areaCode)
                                                .Select(p => new ParticipGetViewDto
            {
                Id = p.Id,
                Surname = p.Surname,
                Name = p.Name,
                SecondName = p.SecondName,
                DocumNumber = (int)p.DocumNumber,
                DataSource = p.DataSource
            });

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

            var entities = cokoContext.Particips.Where(p => p.ProjectId == ItakeEgeProjectId && p.SchoolId == schoolId)
                                                .Select(p => new ParticipGetViewDto
                {
                    Id = p.Id,
                    Surname = p.Surname,
                    Name = p.Name,
                    SecondName = p.SecondName,
                    DocumNumber = (int)p.DocumNumber,
                    DataSource = p.DataSource
                });

            return entities;
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

        public void Delete(int participId)
        {
            _participRepository.Delete(participId);
        }        

        IEnumerable<ParticipPostDto> IParticipService.GetAll(int projectTestId, int? areaCode, string schoolId)
        {
            throw new NotImplementedException();
        }

        ParticipPostDto IParticipService.GetById(int participId)
        {
            throw new NotImplementedException();
        }

        public void Update(int id, ParticipPostDto dto)
        {
            throw new NotImplementedException();
        }
    }
}

// checking for duplication
//var existEntity = cokoContext.Particips.Any(p => p.ProjectId == ItakeEgeProjectId &&
//                                                 p.Surname.ToLower().Equals(dto.Surname.Trim().ToLower()) &&
//                                                 p.Name.ToLower().Equals(dto.Name.Trim().ToLower()) &&
//                                                 p.SecondName.ToLower().Equals(dto.SecondName.Trim().ToLower()) &&
//                                                 p.DocumNumber == dto.DocumNumber);

//catch (DbUpdateException exception)
//{
//    // ReSharper disable once InvertIf
//    if (exception.InnerException != null)
//    {
//        if (exception.InnerException.InnerException is SqlException innerException && 
//            (innerException.Number == 2601 || innerException.Number == 2627))
//        {
//            throw new DublicateEntityException();
//        }
//        else
//        {
//            throw;
//        }
//    }                
//}