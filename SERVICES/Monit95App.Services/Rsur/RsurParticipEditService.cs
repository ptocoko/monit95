using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Monit95App.Domain.Core;
using Monit95App.Domain.Interfaces;
using Monit95App.Services.Interfaces;
using AutoMapper;
using Monit95App.Domain.Core.Entities;

namespace Monit95App.Services.Rsur
{
    public class RsurParticipEditService : IRsurParticipEditService
    {
        #region Dependencies

        private readonly IGenericRepository<RsurParticip> _rsurParticipRepository;
        private readonly IGenericRepository<RsurParticipEdit> _rsurParticipEditRepository;        

        #endregion

        public RsurParticipEditService(IGenericRepository<RsurParticip> rsurParticipRepository,
                                       IGenericRepository<RsurParticipEdit> rsurParticipEditRepository)
        {
            _rsurParticipRepository = rsurParticipRepository;
            _rsurParticipEditRepository = rsurParticipEditRepository;            
        }

        #region Services

        public IEnumerable<RsurParticipEditModel> GetAll()
        {
            var models = _rsurParticipEditRepository.GetAll().Join(_rsurParticipRepository.GetAll(), ik => ik.ParticipCode, ok => ok.ParticipCode, (ik, ok) => new RsurParticipEditModel
            {
                ParticipCode = ik.ParticipCode,
                NewParticipSurname = ik.Surname,
                OldParticipSurname = ok.Surname,
                NewParticipName = ik.Name,
                OldParticipName = ok.Name,
                NewParticipSecondName = ik.SecondName,
                OldParticipSecondName = ok.SecondName
            }).ToList();

            return models;
        }

        public bool AddModel(RsurParticipEditModel model)
        {
            try
            {
                var entity = new RsurParticipEdit
                {
                    ParticipCode = model.ParticipCode,
                    Surname = model.NewParticipSurname,
                    Name = model.NewParticipName,
                    SecondName = model.NewParticipSecondName
                };

                _rsurParticipEditRepository.Insert(entity);                
            }
            catch (RetryLimitExceededException)
            {
                return false;
            }
            return true;
        }

        public void Apply(string participCode) //apply and delete edit
        {
            if (participCode == null)
            {
                throw new ArgumentNullException(nameof(participCode));
            }

            var entity = _rsurParticipRepository.GetById(participCode);
            if (entity == null || entity.RsurParticipEdit == null)
            {
                throw new ArgumentException(nameof(entity));
            }

            Mapper.Initialize(cfg => cfg.CreateMap<RsurParticipEdit, RsurParticip>()
                .ForMember(dest => dest.Surname, opt => opt.Condition(src => !String.IsNullOrEmpty(src.Surname)))
                .ForMember(dest => dest.Name, opt => opt.Condition(src => !String.IsNullOrEmpty(src.Name))));

            Mapper.Map(entity.RsurParticipEdit, entity);

            _rsurParticipEditRepository.Delete(participCode);
        }

        #endregion
    }
}