using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;

using AutoMapper;

using Monit95App.Domain.Core.Entities;
using Monit95App.Infrastructure.Data;
using Monit95App.Services.DTOs;
using Monit95App.Services.Interfaces;
using Monit95App.Services.Rsur.Particip;

namespace Monit95App.Services.Rsur
{
    using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;
    /// <summary>
    /// Класс для работы с участниками проекта РСУР
    /// </summary>
    public class RsurParticipService : IRsurParticipService
    {  
        #region Dependencies

        private readonly CokoContext _cokoContext;        

        #endregion

        public RsurParticipService()            
        {
            _cokoContext = new CokoContext();
            InitMapper();
        }

        // injected context for unit-testing
        public RsurParticipService(CokoContext context)
        {
            _cokoContext = context;
            InitMapper();
        }

        private void InitMapper()
        {
            Mapper.Initialize(
               cfg => cfg.CreateMap<RsurParticip, RsurParticipGetDto>()
                   .ForPath(
                       dist => dist.SchoolParticipInfo.SchoolName,
                       opt => opt.MapFrom(src => $"{src.SchoolId} - {src.School.Name.TrimEnd()}"))
                    .ForPath(
                        dist => dist.SchoolParticipInfo.Surname,
                        opt => opt.MapFrom(src => src.Surname))
                    .ForPath(
                        dist => dist.SchoolParticipInfo.Name,
                        opt => opt.MapFrom(src => src.Name))
                    .ForPath(
                        dist => dist.SchoolParticipInfo.SecondName,
                        opt => opt.MapFrom(src => src.SecondName))
                   .ForMember(
                       dist => dist.AreaCodeWithName,
                       opt => opt.MapFrom(src => $"{src.School.AreaCode} - {src.School.Area.Name.TrimEnd()}"))
                    .ForMember(
                        dist => dist.LastBlockName,
                        opt => opt.MapFrom(src => LastBlockNameMapper(src)))
                    .ForMember(
                        dist => dist.LastBlockStatus,
                        opt => opt.MapFrom(src => LastBlockStatusMapper(src)))
                );
        }

        #region Methods

        public int Add(ParticipAddDto dto)
        {
            _ = dto ?? throw new ArgumentNullException();
            var validContext = new ValidationContext(dto);
            Validator.ValidateObject(dto, validContext, true);

            Mapper.Initialize(cfg => cfg.CreateMap<ParticipAddDto, RsurParticip>()
                                        .AfterMap((s, d) => d.ActualCode = 2));
            var entity = Mapper.Map<ParticipAddDto, RsurParticip>(dto);

            this._cokoContext.RsurParticips.Add(entity);
            this._cokoContext.SaveChanges();

            return entity.Code;            
        }

        public RsurParticipGetDto GetByCode(int code)
        {
            if (code < 10_000 || code >= 100_000)
            {
                throw new ArgumentOutOfRangeException(nameof(code));
            }

            var entity = this._cokoContext.RsurParticips.Find(code);

            if (entity == null)
            {
                throw new ArgumentException();
            }

            var dto = Mapper.Map<RsurParticip, RsurParticipGetDto>(entity);

            return dto;
        }

        public IEnumerable<RsurParticipGetDto> GetAll(int? areaCode = null, string schoolId = null)
        {
            var query = this._cokoContext.RsurParticips
                .AsNoTracking()
                .AsQueryable()
                .Include(inc => inc.School.Area)
                .Include("RsurParticipTests.RsurTestResult")
                .Include("RsurParticipTests.RsurTest.Test");

            if (areaCode != null)
            {
                query = query.Where(entity => entity.School.Area.Code == areaCode);
            }

            if (schoolId != null)
            {
                query = query.Where(entity => entity.SchoolId == schoolId);
            }

            var entities = query.ToList();

            // Mapper работает некорректно
            //var dtos = Mapper.Map<List<RsurParticip>, IEnumerable<RsurParticipGetDto>>(entities);

            var dtos = entities.Select(MapParticips);

            return dtos.OrderBy(ob => ob.SchoolParticipInfo.Surname).ThenBy(tb => tb.SchoolParticipInfo.Name).ThenBy(tb => tb.SchoolParticipInfo.SecondName);
        }

        public IEnumerable<RsurParticipGetDto> Search(SearchOptions options)
        {
            var query = _cokoContext.RsurParticips.AsNoTracking().AsQueryable();

            if(options != null)
            {
                if (options.AreaCode.HasValue)
                {
                    query = query.Where(p => p.School.AreaCode == options.AreaCode);
                }

                if(options.SchoolId != null)
                {
                    query = query.Where(p => p.SchoolId == options.SchoolId);
                }

                if (options.ActualCode.HasValue)
                {
                    query = query.Where(p => p.ActualCode == options.ActualCode.Value);
                }

                if(options.Search != null)
                {
                    query = query.Where(p => p.Code.ToString().Contains(options.Search)
                                          || p.Surname.Contains(options.Search)
                                          || p.Name.Contains(options.Search)
                                          || p.SecondName.Contains(options.Search));
                }
            }

            query = query.OrderBy(ob => ob.Surname).ThenBy(tb => tb.Name).ThenBy(tb => tb.SecondName);

            var dtos = query.AsEnumerable().Select(MapParticips);

            return dtos;
        }

        public void Update(int code, RsurParticipPutDto dto)
        {
            // Validate
            if (code < 10_000 || code >= 100_000)
            {
                throw new ArgumentOutOfRangeException(nameof(code));
            }

            var validContext = new ValidationContext(dto);
            Validator.ValidateObject(dto, validContext, true);
            var entity = this._cokoContext.RsurParticips.Find(code);
            if (entity == null)
            {
                throw new ArgumentException(nameof(code));
            }

            Mapper.Initialize(cfg => cfg.CreateMap<RsurParticipPutDto, RsurParticip>());
            Mapper.Map(dto, entity);

            this._cokoContext.SaveChanges();
        }

        public void Delete(int code)
        {            
            if (code < 10_000 || code >= 100_000)
            {
                throw new ArgumentOutOfRangeException(nameof(code));
            }

            var entity = this._cokoContext.RsurParticips.Find(code);
            if (entity == null)
            {
                throw new ArgumentException(nameof(entity));
            }

            this._cokoContext.RsurParticips.Remove(entity);
            this._cokoContext.SaveChanges();
        }        

        #endregion

        private RsurParticipGetDto MapParticips(RsurParticip src)
        {
            return new RsurParticipGetDto
            {
                SchoolParticipInfo = new Domain.Core.SchoolParticip
                {
                    Surname = src.Surname,
                    Name = src.Name,
                    SecondName = src.SecondName,
                    SchoolName = $"{src.SchoolId} - {src.School.Name.TrimEnd()}"
                },
                Code = src.Code,
                RsurSubjectName = src.RsurSubject.Name,
                AreaCodeWithName = $"{src.School.AreaCode} - {src.School.Area.Name.TrimEnd()}",
                LastBlockName = LastBlockNameMapper(src),
                LastBlockStatus = LastBlockStatusMapper(src),
                ActualCode = src.ActualCode,
                Email = src.Email,
                Phone = src.Phone,
                CategoryName = src.Category.Name.TrimEnd(),
                Birthday = src.Birthday.HasValue ? src.Birthday.Value.ToString("dd.MM.yyyy г.") : null
            };
        }

        private string LastBlockNameMapper(RsurParticip src)
        {
            var participTestResults = src.RsurParticipTests.Where(p => p.RsurTestResult != null && p.RsurTestResult.Grade5 != null).ToList();

            if (participTestResults == null || participTestResults.Count() < 1 || !participTestResults.Any())
            {
                return null;
            }
            var test = participTestResults
                .OrderBy(ob => ob.RsurTestId)
                .Last()
                .RsurTest
                .Test;

            var testName = test.NumberCode + " - " + test.Name;

            if(testName.Length > 40)
            {
                testName = testName.Substring(0, 40) + "...";
            }

            return testName;
        }

        private int LastBlockStatusMapper(RsurParticip src)
        {
            var participTestResults = src.RsurParticipTests.Where(p => p.RsurTestResult != null && p.RsurTestResult.Grade5 != null).ToList();

            if (participTestResults == null || participTestResults.Count() < 1 || !participTestResults.Any())
            {
                return 2;
            }

            return participTestResults
                .OrderBy(ob => ob.RsurTestId)
                .Last()
                .RsurTestResult
                .Grade5.Value == 5 ? 1 : 0;
        }
    }

    public class SearchOptions
    {
        public int? AreaCode { get; set; }
        public string SchoolId { get; set; }
        public int? ActualCode { get; set; }
        public string Search { get; set; }
    }
}
