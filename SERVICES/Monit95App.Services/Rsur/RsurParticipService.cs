using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
                   .ForMember(
                       dist => dist.SchoolIdWithName,
                       opt => opt.MapFrom(src => $"{src.SchoolId} - {src.School.Name.TrimEnd()}"))
                   .ForMember(
                       dist => dist.AreaCodeWithName,
                       opt => opt.MapFrom(src => $"{src.School.AreaCode} - {src.School.Area.Name.TrimEnd()}")));
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
            var query = this._cokoContext.RsurParticips.AsQueryable();

            if (areaCode != null)
            {
                query = query.Where(entity => entity.School.Area.Code == areaCode);
            }

            if (schoolId != null)
            {
                query = query.Where(entity => entity.SchoolId == schoolId);
            }

            var entities = query.ToList();

            var dtos = Mapper.Map<List<RsurParticip>, IEnumerable<RsurParticipGetDto>>(entities);

            return dtos.OrderBy(ob => ob.Surname).ThenBy(tb => tb.Name).ThenBy(tb => tb.SecondName);
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
    }
}
